const { pool } = require("../../config/database");
const { getKSTDate } = require("../utils");
const Dao = require("./Dao");
const _ = require("lodash");

async function select(daoFunc, params) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await daoFunc(connection, params);
    connection.release();
    return result;
  } catch (err) {
    console.error(daoFunc, err);
    return;
  }
}

async function getUserProfile(userId) {
  const result = await select(Dao.getUserProfile, [userId]);
  return result;
}

async function existUser(userId, password) {
  const result = await select(Dao.selectUser, [userId, password]);
  if (result.length > 0) {
    return true;
  }
  return false;
}

async function checkId(id) {
  const result = await select(Dao.checkId, [id]);
  if (result.length > 0) {
    return false;
  }
  return true;
}

async function getAllChallenges() {
  const result = await select(Dao.getAllChallenges, []);
  return result;
}

async function getChallengesWithUser(user_id) {
  const result = await select(Dao.getChallengesWithUser, [user_id]);
  return result;
}

async function doesExistUserHaving(email) {
  const result = await select(Dao.doesExistUserHaving, [email]);
  if (result.length > 0) {
    return true;
  }
  return false;
}

async function checkChallengeName(name) {
  const result = await select(Dao.checkChallengeName, [name]);
  if (result.length > 0) {
    return true;
  }
  return false;
}

async function getRankingForChallenge(challengeId) {
  try {
    console.log("hi", challengeId);
    const dt = getKSTDate(-1); // yesterday
    console.log(dt);
    const rankings = await Dao.getRankingForChallenge(challengeId, dt);
    if (rankings.length === 0) {
      return [];
    }

    const userIds = _(rankings).map("user_id").value();
    const [durations, users] = await Promise.all([
      Dao.getChallengeDurationWithUserIds(challengeId, userIds),
      Dao.getUsersInfo(userIds),
    ]);
    const userIdToDuration = _.keyBy(durations, "user_id");
    const userIdToUserInfo = _.keyBy(users, "id");
    return _.orderBy(rankings, "ranking", "desc").map((ranking, index) => ({
      userId: ranking.user_id,
      ranking: rankings.length - index,
      profileImageUrl: userIdToUserInfo[ranking.user_id]?.profile_image_url,
      duration: userIdToDuration[ranking.user_id]?.duration,
    }));
  } catch (err) {
    console.error(err, challengeId);
    return [];
  }
}

async function getUserRankingForAChallenge(userIdFromToken, challenge_id) {
  const result = await select(Dao.getUserRankingForAChallenge, [
    userIdFromToken,
    challenge_id,
  ]);
  const result2 = await select(Dao.getUserDurationForAChallenge, [
    userIdFromToken,
    challenge_id,
  ]);
  // result: [
  //   {
  //     dt: "2024-08-03",
  //     ranking: 1,
  //   },
  //   {
  //     dt: "2024-08-04",
  //     ranking: 3,
  //   },
  //   {
  //     dt: "2024-08-05",
  //     ranking: 8,
  //   },
  // ];
  // return result;
  console.log(result, result2);
  // TODO: 09-07 - merge this results and response
}

module.exports = {
  getUserProfile,
  existUser,
  checkId,
  getAllChallenges,
  getChallengesWithUser,
  doesExistUserHaving,
  checkChallengeName,
  getRankingForChallenge,
  getUserRankingForAChallenge,
};
