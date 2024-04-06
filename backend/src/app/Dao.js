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

module.exports = {
  signUp,
  createChallenge,
  deleteUser,
  
};
