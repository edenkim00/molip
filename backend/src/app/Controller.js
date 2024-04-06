const { signUp, deleteUser, getUserProfile, signIn, changePassword} = require("./lib/user");
const { createChallenge } = require("./lib/challenge");


exports.signUp = signUp;
exports.createChallenge = createChallenge;
exports.deleteUser = deleteUser;
exports.getUserProfile = getUserProfile;
exports.signIn = signIn;
exports.changePassword = changePassword;