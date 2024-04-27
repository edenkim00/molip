const { signUp, deleteUser, getUserProfile, signIn, changePassword} = require("./lib/user");
const { createChallenge } = require("./lib/challenge");


exports.signUp = signUp;
exports.deleteUser = deleteUser;
exports.signIn = signIn;
exports.getUserProfile = getUserProfile;
exports.changePassword = changePassword;

exports.createChallenge = createChallenge;