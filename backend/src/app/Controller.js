const {
  signUp,
  deleteUser,
  getUserProfile,
  signIn,
  changePassword,
  requestEmailVerification,
} = require("./lib/user");
const {
  createChallenge,
  getChallenges,
  record,
  connectUserChallenge,
  disconnectUserChallenge,
} = require("./lib/challenge");

const { uploadImageToS3 } = require("./lib/image");

exports.signUp = signUp;
exports.deleteUser = deleteUser;
exports.signIn = signIn;
exports.getUserProfile = getUserProfile;
exports.changePassword = changePassword;
exports.requestEmailVerification = requestEmailVerification;

exports.getChallenges = getChallenges;
exports.record = record;
exports.createChallenge = createChallenge;
exports.connectUserChallenge = connectUserChallenge;
exports.disconnectUserChallenge = disconnectUserChallenge;

exports.uploadImageToS3 = uploadImageToS3;
