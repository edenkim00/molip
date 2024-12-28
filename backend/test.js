/* */
const { getUserRankingForAChallenge } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = getUserRankingForAChallenge;
//id, password, email
/* API INPUT */
const userId = "edenkim00"; // only authorzation required
const data = { user_id: "edenkim00", challenge_id: 1, offset: 0 };
const userIds = [
  {
    user_id: "john00",
  },
  {
    user_id: "doe11",
  },
  {
    user_id: "jane22",
  },
  {
    user_id: "smith33",
  },
  {
    user_id: "kane44",
  },
  {
    user_id: "jake55",
  },
  {
    user_id: "jenny66",
  },
  {
    user_id: "jessica77",
  },
  {
    user_id: "jessie88",
  },
  {
    user_id: "jess99",
  },
  {
    user_id: "edenkim00",
  },
];

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
  // eslint-disable-next-line
  process.exit();
});
