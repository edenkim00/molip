module.exports = {
  // Success
  SUCCESS: { isSuccess: true, code: 1000, message: "성공" },

  // Fail
  WRONG_BODY: {
    isSuccess: false,
    code: 2000,
    message: "입력값을 확인해주세요.",
  },

  DB_ERROR: {
    isSuccess: false,
    code: 2001,
    message: "데이터베이스 처리 에러",
  },

  NO_USER: {
    isSuccess: false,
    code: 3001,
    message: "유저가 존재하지 않음",
  },

  WRONG_LOGIN_DETAIL: {
    isSuccess: false,
    code: 3002,
    message: "아이디와 비밀번호가 일치하지 않음",
  },

  ALREADY_EXISTING_ID: {
    isSuccess: false,
    code: 3003,
    message: "이미 존재하는 아이디",
  },
};
