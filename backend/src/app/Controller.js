const {
  signUp,
  deleteUser,
  getUserProfile,
  signIn,
  changePassword,
  requestEmailVerification,
  updateUserProfile,
} = require("./lib/user");
const {
  createChallenge,
  getChallenges,
  trackRecord,
  connectUserChallenge,
  disconnectUserChallenge,
  getRankingForChallenge,
  getUserRankingForAChallenge,
} = require("./lib/challenge");

const { uploadImageToS3 } = require("./lib/image");

exports.signUp = signUp;
exports.deleteUser = deleteUser;
exports.signIn = signIn;
exports.getUserProfile = getUserProfile;
exports.changePassword = changePassword;
exports.requestEmailVerification = requestEmailVerification;
exports.updateUserProfile = updateUserProfile;

exports.getChallenges = getChallenges;
exports.trackRecord = trackRecord;
exports.createChallenge = createChallenge;
exports.connectUserChallenge = connectUserChallenge;
exports.disconnectUserChallenge = disconnectUserChallenge;
exports.getRankingForChallenge = getRankingForChallenge;
exports.getUserRankingForAChallenge = getUserRankingForAChallenge;

exports.uploadImageToS3 = uploadImageToS3;
