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
];

module.exports = {
  ENDPOINT_METADATA,
};
