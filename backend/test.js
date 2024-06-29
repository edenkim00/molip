/* */
const { createChallenge } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = createChallenge;
//id, password, email
/* API INPUT */
const userId = "11234"; // only authorzation required
const data = {
  name: "te12313st",
  description: "te222st",
  private: false,
  password: "te2st",
  createrId: "11234",
};

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
  // eslint-disable-next-line
  process.exit();
});
