/* */
const { requestEmailVerification } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = requestEmailVerification;
//id, password, email
/* API INPUT */
const userId = "11234"; // only authorzation required
const data = {
  shouldExist: true,
  email: "eotjd0986@gmail.com",
  // user_id: "11234",
  // challenge_id: 1,
};

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
  // eslint-disable-next-line
  process.exit();
});
