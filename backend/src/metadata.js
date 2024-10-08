const Controller = require("./app/Controller");
const ENDPOINT_METADATA = [
  // sign-up
  {
    endpoint: "/app/user",
    method: "POST",
    tokenRequired: false,
    next: Controller.signUp,
  },
  {
    endpoint: "/app/user",
    method: "DELETE",
    tokenRequired: true,
    next: Controller.deleteUser,
  },
  {
    endpoint: "/app/user",
    method: "GET",
    tokenRequired: true,
    next: Controller.getUserProfile,
  },
  {
    endpoint: "/app/user-password",
    method: "PATCH",
    tokenRequired: false,
    next: Controller.changePassword,
  },
  {
    endpoint: "/app/user/sign-in",
    method: "POST",
    tokenRequired: false,
    next: Controller.signIn,
  },
  {
    endpoint: "/app/user/email-verification",
    method: "GET",
    tokenRequired: false,
    next: Controller.requestEmailVerification,
  },
  {
    endpoint: "/app/user/profile-image",
    method: "PATCH",
    tokenRequired: true,
    next: Controller.updateUserProfile,
  },

  {
    endpoint: "/app/challenge",
    method: "POST",
    tokenRequired: true,
    next: Controller.createChallenge,
  },

  // select all challenge
  {
    endpoint: "/app/challenge",
    method: "GET",
    tokenRequired: false,
    next: Controller.getChallenges,
  },

  // select challenge for a user
  {
    endpoint: "/app/user/challenge",
    method: "GET",
    tokenRequired: true,
    next: Controller.getChallenges,
  },

  {
    endpoint: "/app/challenge-join",
    method: "POST",
    tokenRequired: true,
    next: Controller.connectUserChallenge,
  },

  {
    endpoint: "/app/challenge-join",
    method: "DELETE",
    tokenRequired: true,
    next: Controller.disconnectUserChallenge,
  },

  {
    endpoint: "/app/record",
    method: "POST",
    tokenRequired: true,
    next: Controller.trackRecord,
  },
  {
    endpoint: "/app/ranking",
    method: "GET",
    tokenRequired: false,
    next: Controller.getRankingForChallenge,
  },

  {
    endpoint: "/app/user-ranking",
    method: "GET",
    tokenRequired: true,
    next: Controller.getUserRankingForAChallenge,
  },
  // util
  {  
    endpoint: "/app/image",
    method: "POST",
    tokenRequired: false,
    next: Controller.uploadImageToS3,
  },
];

module.exports = {
  ENDPOINT_METADATA,
};
