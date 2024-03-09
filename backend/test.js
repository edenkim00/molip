/* */
const { signUp } = require("./src/app/Controller.js");

const test = signUp;
const userId = 1;
const data = {
  email: "eotjd0986@gmail.com",
  password: "1234",
};
// const data = {
//   category_id: 1,
//   force: true,
//   vote_data: {
//     Mon: ["None", "None"],
//     Tue: ["Basketball", "Badminton"],
//     Wed: ["Basketball", "Badminton"],
//     Thu: ["Basketball", "Badminton"],
//     Fri1: ["Basketball", "Badminton"],
//     Fri2: ["Basketball", "Badminton"],
//     Sat1: ["Basketball", "Badminton"],
//     Sat2: ["Basketball", "Badminton"],
//   },
// };

test(data, { userId }).then((res) => {
  console.log(res);
});
