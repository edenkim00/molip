/* */
const { createChallenge } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = createChallenge;

/* API INPUT */
const userId = "daeseong"; // only authorzation required
const data = {
  name: "hi", // 50 글자 이내
  description: "a;slkdfjal;kjfal;sfjaf", //150글자 이내
  private: false,
  password: 12345,
};

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
});
