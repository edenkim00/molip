const { pool } = require("../../config/database");
const Dao = require("./Dao");
const _ = require("lodash");
const { getKSTDate } = require("./utils/util");

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
    const dt = getKSTDate(-1); // yesterday
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

    return _.orderBy(rankings, "ranking", "asc").map((ranking, index) => ({
      userId: ranking.user_id,
      ranking: index + 1,
      profileImageUrl: userIdToUserInfo[ranking.user_id]?.profile_image_url,
      duration: userIdToDuration[ranking.user_id]?.duration,
    }));
  } catch (err) {
    console.error(err, challengeId);
    return [];
  }
}

async function getUserRankingForAChallenge(userId, challenge_id, offset = 0) {
  const interval = 7; // 7 days

  const start = getKSTDate((offset - 1) * interval); // {offset} week ago
  const end = getKSTDate(offset * interval - 1); // yesterday

  const rankingData = await Dao.selectRankingsWithUserIdAndChallengeId(
    userId,
    challenge_id,
    start,
    end
  );

  const durationData = await Dao.selectDurationWithUserIdAndChallengeId(
    userId,
    challenge_id,
    start,
    end
  );

  const rankingDataByDate = _.keyBy(rankingData, "dt");
  const durationDataByDate = _.keyBy(durationData, "dt");
  const result = [];
  for (const dt of Object.keys(rankingDataByDate)) {
    result.push({
      dt,
      ranking: rankingDataByDate[dt].ranking,
      duration: durationDataByDate[dt]?.duration || 0,
    });
  }
  console.log(result);

  return _.orderBy(result, "dt", "asc");
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
