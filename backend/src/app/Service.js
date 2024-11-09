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
  createrId,
  imageUrl
) {
  const connection = await pool.getConnection(async (conn) => conn); // DB 연결
  try {
    connection.beginTransaction(); // BACKUP
    const challengeId = await Dao.createChallenge(
      connection,
      name,
      description,
      private,
      password,
      createrId,
      imageUrl
    );
    connection.commit(); // COMMIT
    return challengeId;
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

async function changePassword(id, email, newPassword) {
  const connection = await pool.getConnection(async (conn) => conn); // DB 연결
  try {
    connection.beginTransaction(); // BACKUP
    const suc = await Dao.changePassword(connection, [newPassword, id, email]);
    if (!suc) {
      return false;
    }

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

async function trackRecord(userId, start, end, challengeId) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    connection.beginTransaction(); // BACKUP
    await Dao.trackRecord(connection, [userId, start, end, challengeId]);
    connection.commit(); // COMMIT
    return true;
  } catch (err) {
    connection.rollback();
    console.error("[trackRecord]", err);
    throw err;
  } finally {
    connection.release();
  }
}

async function connectUserChallenge(userId, challengeId) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    connection.beginTransaction(); // BACKUP
    const exist = await Dao.doesExistConnection(connection, [
      userId,
      challengeId,
    ]);
    if (exist?.length > 0) {
      return false;
    }
    await Dao.connectUserChallenge(connection, [userId, challengeId]);
    connection.commit(); // COMMIT
    return true;
  } catch (err) {
    connection.rollback();
    console.error("[connectUserChallenge]", err);
    throw err;
  } finally {
    connection.release();
  }
}

async function disconnectUserChallenge(userId, challengeId) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    connection.beginTransaction(); // BACKUP
    await Dao.disconnectUserChallenge(connection, [userId, challengeId]);
    connection.commit(); // COMMIT
    return true;
  } catch (err) {
    connection.rollback();
    console.error("[disconnectUserChallenge]", err);
    throw err;
  } finally {
    connection.release();
  }
}

async function updateUserProfile(userId, imageUrl) {
  const connection = await pool.getConnection(async (conn) => conn); // DB 연결
  try {
    connection.beginTransaction(); // BACKUP
    await Dao.updateUserProfile(connection, [imageUrl, userId]);
    connection.commit(); // COMMIT
    return true;
  } catch (err) {
    connection.rollback();
    console.error("[updateUserProfile]", err);
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
  trackRecord,
  connectUserChallenge,
  disconnectUserChallenge,
  updateUserProfile,
};
