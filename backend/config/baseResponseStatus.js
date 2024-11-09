module.exports = {
  // Success
  SUCCESS: { isSuccess: true, code: 1000, message: "Success" },

  // Fail
  WRONG_BODY: {
    isSuccess: false,
    code: 2000,
    message: "Please check the data.",
  },

  DB_ERROR: {
    isSuccess: false,
    code: 2001,
    message: "Unknown Error",
  },

  NO_USER: {
    isSuccess: false,
    code: 3001,
    message: "Not existing user.",
  },

  WRONG_LOGIN_DETAIL: {
    isSuccess: false,
    code: 3002,
    message: "Wrong login detail.",
  },

  ALREADY_EXISTING_ID: {
    isSuccess: false,
    code: 3003,
    message: "Already existing ID.",
  },

  WRONG_PASSWORD_LENGTH: {
    isSuccess: false,
    code: 3004,
    message: "Password should be 8~20 characters.",
  },

  WRONG_ID_LENGTH: {
    isSuccess: false,
    code: 3005,
    message: "ID should be 5~30 characters.",
  },

  NO_TOKEN: {
    isSuccess: false,
    code: 4001,
    message: "Session is invalid, please log in again.",
  },

  AUTHORIZATION_FAILED: {
    isSuccess: false,
    code: 5001,
    message: "Authorization failed. Please check your access right.",
  },

  EMAIL_DOES_NOT_EXIST: {
    isSuccess: false,
    code: 6001,
    message: "Wrong email. Please check your email.",
  },

  EMAIL_SEND_ERROR: {
    isSuccess: false,
    code: 6002,
    message: "Email sending error. Please try again.",
  },

  ALREADY_EXISTING_CONNECTION: {
    isSuccess: false,
    code: 7001,
    message: "Already Joined.",
  },

  // CREATE CHALLENGE
  CHALLENGE_CREATION_NAME_LENGTH_ERROR: {
    isSuccess: false,
    code: 8001,
    message: "Challenge name should be less than 20 characters.",
  },

  // description < 150
  CHALLENGE_CREATION_DESCRIPTION_LENGTH_ERROR: {
    isSuccess: false,
    code: 8002,
    message: "Challenge description should be less than 150 characters.",
  },

  // password 4~20
  CHALLENGE_CREATION_PASSWORD_LENGTH_ERROR: {
    isSuccess: false,
    code: 8003,
    message: "Challenge password should be 4~20 characters.",
  },

  // ALERTEADY EXISTING CHALLENGE
  ALREADY_EXISTING_CHALLENGE: {
    isSuccess: false,
    code: 8004,
    message: "Already existing challenge name.",
  },

  // fail to change password
  WRONG_ID_EMAIL: {
    isSuccess: false,
    code: 9001,
    message: "Unable to change password. Please check your ID and email.",
  },
};
