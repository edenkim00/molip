/* */
const { disconnectUserChallenge } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = disconnectUserChallenge;
//id, password, email
/* API INPUT */
const userId = "11234"; // only authorzation required
const data = {
  user_id: "11234",
  challenge_id: 1,
};

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
});
