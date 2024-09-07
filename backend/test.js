/* */
const { getRankingForChallenge } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = getRankingForChallenge;
//id, password, email
/* API INPUT */
const userId = "daeseong"; // only authorzation required
const data = {
  challenge_id: 1,
  // shouldExist: "false",
};

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
  // eslint-disable-next-line
  process.exit();
});
