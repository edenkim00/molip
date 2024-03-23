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
};
