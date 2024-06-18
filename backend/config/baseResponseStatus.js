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
};
