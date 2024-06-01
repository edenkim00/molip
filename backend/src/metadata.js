const Controller = require("./app/Controller");
const ENDPOINT_METADATA = [
  /* for user */

  // sign-up
  {
    endpoint: "/app/user",
    method: "POST",
    tokenRequired: false,
    next: Controller.signUp,
  },
  {
    endpoint: "/app/challenge",
    method: "POST",
    tokenRequired: true,
    next: Controller.createChallenge,
  },
  {
    endpoint: "/app/hojintest",
    method: "GET",
    tokenRequired: false,
    next: () => {
      console.log("HOJIN WELCOME");
      return {
        statusCode: 200,
        body: "HOJIN WELCOME",
      };
    },
  },
];

module.exports = {
  ENDPOINT_METADATA,
};
