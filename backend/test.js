/* */
const { getUserRankingForAChallenge } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = getUserRankingForAChallenge;
//id, password, email
/* API INPUT */
const userId = "daeseong"; // only authorzation required
const data = {
  challenge_id: 1,
  offset: -3,
  // shouldExist: "false",
};

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
  // eslint-disable-next-line
  process.exit();
});
