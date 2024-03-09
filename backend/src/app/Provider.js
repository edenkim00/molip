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

module.exports = {};
