/* */
const { trackRecord, getChallenges } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = getChallenges;
//id, password, email
/* API INPUT */
const userId = "edenkim00"; // only authorzation required
const data = { user_id: "edenkim00" };

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
  // eslint-disable-next-line
  process.exit();
});
