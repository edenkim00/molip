async function signUp(connection, id, password, email) {
  const Query = `INSERT INTO Molip_Users(id, password, email) VALUES(?, ?, ?);`;
  await connection.query(Query, [id, password, email]);
  return;
}

async function createChallenge(
  connection,
  name,
  description,
  private,
  password,
  createrId,
  imageUrl = undefined
) {
  const Query = `INSERT INTO Molip_Challenges(name, description, private, password, creator_id, image_url) VALUES(?, ?, ?, ?, ?, ?);`;
  const res = await connection.query(Query, [
    name,
    description,
    private,
    password,
    createrId,
    imageUrl,
  ]);
  const challengeId = res[0].insertId;
  return challengeId;
}

async function getUserProfile(connection, params) {
  const Qeury =
    "SELECT id, profile_image_url FROM Molip_Users WHERE id = ? AND status = 'active'";
  const result = await connection.query(Qeury, params);
  return result[0];
}

async function selectUser(connection, params) {
  const Query =
    "SELECT id FROM Molip_Users WHERE id = ? and password = ? AND status = 'active'";
  const result = await connection.query(Query, params);
  return result[0];
}

async function changePassword(connection, params) {
  const Query =
    "UPDATE Molip_Users SET password = ? WHERE id = ? AND status = 'active'";
  await connection.query(Query, params);
  return;
}

async function checkId(connection, params) {
  const Query = "SELECT id FROM Molip_Users WHERE id = ? AND status = 'active'";
  const result = await connection.query(Query, params);
  return result[0];
}

async function getAllChallenges(connection) {
  const Query =
    `SELECT C.*, SUM(CASE WHEN user_id is not null then 1 else 0 end) AS joined_users_count FROM Molip_Challenges C
      LEFT OUTER JOIN Molip_User_Challenge_Connections MUCC ON C.id = MUCC.challenge_id AND MUCC.status = 'active'
      WHERE C.status = 'active'
      GROUP BY C.id`
      .replace(/\s+/g, " ")
      .trim();
  const result = await connection.query(Query);
  return result[0];
}

async function getChallengesWithUser(connection, params) {
  const Query = `SELECT MC.* FROM Molip_User_Challenge_Connections MUCC
       JOIN Molip_Challenges MC ON MUCC.challenge_id = MC.id AND MUCC.status = 'active'
    WHERE MUCC.user_id = ? AND MUCC.status = 'active';`;
  const result = await connection.query(Query, params);
  return result[0];
}

async function trackRecord(connection, params) {
  const Query =
    "INSERT INTO Molip_Records (user_id, start, end, challenge_id) VALUES(?,?,?,?);";
  const result = await connection.query(Query, params);
  return result;
}

async function connectUserChallenge(connection, params) {
  const Query =
    "INSERT INTO Molip_User_Challenge_Connections (user_id, challenge_id) VALUES (?,?);";
  await connection.query(Query, params);
}

async function disconnectUserChallenge(connection, params) {
  const Query =
    "UPDATE Molip_User_Challenge_Connections SET status = 'deleted' WHERE user_id = ? and challenge_id = ? and status = 'active';";
  await connection.query(Query, params);
}

async function doesExistConnection(connection, params) {
  const Query =
    "SELECT id FROM Molip_User_Challenge_Connections WHERE user_id = ? AND challenge_id = ? AND status = 'active'";
  const result = await connection.query(Query, params);
  return result[0];
}

async function doesExistUserHaving(connection, email) {
  const Query =
    "SELECT id FROM Molip_Users WHERE email = ? AND status = 'active'";
  const result = await connection.query(Query, [email]);
  return result[0];
}

async function deleteUser(connection, userId) {
  const Query = "UPDATE Molip_Users SET status = 'deleted' WHERE id = ?";
  await connection.query(Query, [userId]);
  return;
}

async function checkChallengeName(connection, name) {
  const Query =
    "SELECT id FROM Molip_Challenges WHERE name = ? AND status = 'active'";
  const result = await connection.query(Query, [name]);
  return result[0];
}

async function updateUserProfile(connection, params) {
  const Query = "UPDATE Molip_Users SET profile_image_url = ? WHERE id = ?";
  await connection.query(Query, params);
}

async function getRanking(connection, challenge_id) {
  const Query = `
    SELECT Ra.user_id, Ra.ranking, U.profile_image_url, SUM(R.end - R.start) AS duration FROM Molip_Rankings Ra
    INNER JOIN Molip_Users U on Ra.user_id = U.id
    INNER JOIN Molip_Records R on R.user_id = U.id
    WHERE Ra.challenge_id = 1 and Ra.dt = '2024-08-03' and Ra.ranking <= 10
    GROUP BY Ra.user_id;
  `;
  const res = await connection.query(Query, [challenge_id]);
  return res[0];
}

module.exports = {
  signUp,
  createChallenge,
  deleteUser,
  getUserProfile,
  selectUser,
  changePassword,
  checkId,
  getAllChallenges,
  getChallengesWithUser,
  trackRecord,
  connectUserChallenge,
  disconnectUserChallenge,
  doesExistUserHaving,
  doesExistConnection,
  checkChallengeName,
  updateUserProfile,
  getRanking,
};
