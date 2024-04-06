/* */
const { deleteUser } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = deleteUser;
//id, password, email
/* API INPUT */
const userId = "alsakdfj"; // only authorzation required
const data = {
  // userId: "alsakdfj", // 50 글자 이내
  // password: "a;sllk;jkdf", //150글자 이내
  // email: "als;kdjfasl;djf@gmail.com",
};

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
});