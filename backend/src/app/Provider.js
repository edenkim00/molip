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

module.exports = {
  getUserProfile,
  existUser,
  checkId,
};
