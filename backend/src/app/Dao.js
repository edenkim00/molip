async function signUp(connection, params) {
  const Query = `INSERT INTO User(email, password, name, graduationYear, sex) VALUES (?,?,?,?,?);`;
  await connection.query(Query, params);
  return;
}

module.exports = {
  signUp,
};
