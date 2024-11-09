/* */
const { trackRecord } = require("./src/app/Controller.js");

/* API TO TEST */
const testFunction = trackRecord;
//id, password, email
/* API INPUT */
const userId = "daeseong"; // only authorzation required
const data = { challenge_id: 9, start: 1731162582, end: 1731162587 };

/* API CALL */
testFunction(data, { userId }).then((res) => {
  console.log(res);
  // eslint-disable-next-line
  process.exit();
});
