const { pool } = require("../../config/database");
const Dao = require("./Dao");

async function signUp(id, password, email) {
  const connection = await pool.getConnection(async (conn) => conn); // DB 연결
  try {
    connection.beginTransaction(); // BACKUP
    await Dao.signUp(connection, id, password, email);
    connection.commit(); // COMMIT
    return true;
  } catch (err) {
    connection.rollback();
    console.error("[signUp]", err);
    throw err;
  } finally {
    connection.release();
  }
}
async function createChallenge(
  name,
  description,
  private,
  password,
  createrId
) {
  const connection = await pool.getConnection(async (conn) => conn); // DB 연결
  try {
    connection.beginTransaction(); // BACKUP
    await Dao.createChallenge(
      connection,
      name,
      description,
      private,
      password,
      createrId
    );
    connection.commit(); // COMMIT
    return true;
  } catch (err) {
    connection.rollback();
    console.error("[createChallenge]", err);
    throw err;
  } finally {
    connection.release();
  }
}

async function deleteUser(userId) {
  const connection = await pool.getConnection(async (conn) => conn); // DB 연결
  try {
    connection.beginTransaction(); // BACKUP
    await Dao.deleteUser(connection, userId);
    connection.commit(); // COMMIT
    return true;
  } catch (err) {
    connection.rollback();
    console.error("[deleteUser]", err);
    throw err;
  } finally {
    connection.release();
  }
}

async function changePassword(id, newPassword) {
  const connection = await pool.getConnection(async (conn) => conn); // DB 연결
  try {
    connection.beginTransaction(); // BACKUP
    await Dao.changePassword(connection, [newPassword, id]);
    connection.commit(); // COMMIT
    return true;
  } catch (err) {
    connection.rollback();
    console.error("[changePassword]", err);
    throw err;
  } finally {
    connection.release();
  }
}

module.exports = {
  signUp,
  createChallenge,
  deleteUser,
  changePassword,
};
