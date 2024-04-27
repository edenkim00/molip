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
  createrId
) {
  const Query = `INSERT INTO Molip_Challenges(name, description, private, password, creator_id) VALUES(?, ?, ?, ?, ?);`;
  await connection.query(Query, [
    name,
    description,
    private,
    password,
    createrId,
  ]);
  return;
}

async function deleteUser(connection, userId) {
  const Query = "DELETE FROM Molip_Users WHERE id = ?";
  await connection.query(Query, [userId]);
  return;
}

async function getUserProfile(connection, params) {
  const Qeury = "SELECT id, profile_image_url FROM Molip_Users WHERE id = ?";
  const result = await connection.query(Qeury, params);
  return result[0];
}

async function selectUser(connection, params) {
  const Query = "SELECT id FROM Molip_Users WHERE id = ? and password = ?";
  const result = await connection.query(Query, params);
  return result[0];
}

async function changePassword(connection, params) {
  const Query = "UPDATE Molip_Users SET password = ? WHERE id = ?";
  const result = await connection.query(Query, params);
  return;
}

async function checkId(connection, params) {
  const Query = "SELECT id FROM Molip_Users WHERE id = ?";
  const result = await connection.query(Query, params);
  return result[0];
}

async function getAllChallenges(connection) {
  const Query = "SELECT * FROM Molip_Challenges";
  const result = await connection.query(Query);
  return result[0];
}

async function getChallengesWithUser(connection, params) {
  const Query =
    "SELECT MC.* FROM Molip_User_Challenge_Connections MUCC JOIN Molip_Challenges MC on MUCC.challenge_id = MC.id WHERE MUCC.user_id = ?;";
  const result = await connection.query(Query, params);
  return result[0];
}

async function record(connection, params) {
  const Query =
    "INSERT INTO Molip_Records (user_id, start, end, challenge_id) VALUES(?,?,?,?);";
  const result = await connection.query(Query, params);
  return result;
}

async function joinChallenge(connection, params) {
  const Query =
    "INSERT INTO Molip_User_Challenge_Connections (user_id, challenge_id) VALUES (?,?);";
  const result = await connection.query(Query, params);
  return result;
}

async function disconnectUserChallenge(connection, params) {
  const Query =
    "UPDATE Molip_User_Challenge_Connections SET status = 'deleted' WHERE user_id = ? and challenge_id = ? and status = 'activate';";
  const result = await connection.query(Query, params);
  return result;
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
  record,
  joinChallenge,
  disconnectUserChallenge,
};
