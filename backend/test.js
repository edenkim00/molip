/* */
const { requestEmailVerification } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = requestEmailVerification;
//id, password, email
/* API INPUT */
const userId = "11234"; // only authorzation required
const data = {
  email: "daniel.hojinkim@gmail.com",
  shouldExist: "false",
};

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
  // eslint-disable-next-line
  process.exit();
});
