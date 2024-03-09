const { pool } = require("../../config/database");
const Dao = require("./Dao");

async function signUp(params) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    connection.beginTransaction();
    await Dao.signUp(connection, params);
    connection.commit();
    return true;
  } catch (err) {
    connection.rollback();
    console.error("[signUp]", err);
  } finally {
    connection.release();
  }
  return false;
}

module.exports = {
  signUp,
};
