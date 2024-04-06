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
  const Qeury = "UPDATE Molip_Users SET password = ? WHERE id = ?";
  const result = await connection.query(Qeury, params);
  return;
}

async function checkId(connection, params) {
  const Qeury = "SELECT id FROM Molip_Users WHERE id = ?";
  const result = await connection.query(Qeury, params);
  return result[0];
}

module.exports = {
  signUp,
  createChallenge,
  deleteUser,
  getUserProfile,
  selectUser,
  changePassword,
  checkId,
};
