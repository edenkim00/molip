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

/*
1. input: querystring: challengeId, userId - token
2. output:
  - 오늘 날짜 기준으로 7일간 
  - 이 유저의 이 챌린지의 랭킹을 일자별로
  - 이 유저의 이 챌린지의 duration(end-start) 일자별로
*/
