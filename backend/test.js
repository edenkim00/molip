/* */
const { signUp } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = signUp;
//id, password, email
/* API INPUT */
const userId = "danielkim"; // only authorzation required
const data = {
  id: "danidelkim", // 50 글자 이내
  password: "asdfasdf", //150글자 이내
  email: "als;kdjfasl;djf@gmail.com",
};

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
});
