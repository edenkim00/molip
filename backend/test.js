/* */
const { getRanking } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = getRanking;
//id, password, email
/* API INPUT */
const userId = "11234"; // only authorzation required
const data = {
  challenge_id: 1,
  shouldExist: "false",
};

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
  // eslint-disable-next-line
  process.exit();
});
