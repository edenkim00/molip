const { pool } = require("../../config/database");
const Dao = require("./Dao");

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

async function getRanking(challenge_id) {
  const result = await select(Dao.getRanking, [challenge_id]);
  return result;
}

module.exports = {
  getUserProfile,
  existUser,
  checkId,
  getAllChallenges,
  getChallengesWithUser,
  doesExistUserHaving,
  checkChallengeName,
  getRanking,
};
