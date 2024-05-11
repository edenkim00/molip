const {
  signUp,
  deleteUser,
  getUserProfile,
  signIn,
  changePassword,
} = require("./lib/user");
const {
  createChallenge,
  getChallenges,
  record,
  connectUserChallenge,
  disconnectUserChallenge,
} = require("./lib/challenge");

exports.signUp = signUp;
exports.deleteUser = deleteUser;
exports.signIn = signIn;
exports.getUserProfile = getUserProfile;
exports.changePassword = changePassword;
exports.getChallenges = getChallenges;
exports.record = record;
exports.createChallenge = createChallenge;
exports.connectUserChallenge = connectUserChallenge;
exports.disconnectUserChallenge = disconnectUserChallenge;
