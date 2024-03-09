/* eslint-disable no-unused-vars */
const baseResponse = require("../../../config/baseResponseStatus");
const response = require("../../../config/response");
const Service = require("../Service");
require("dotenv").config();

async function signUp(data) {
  // Validation

  // Service
  await Service.signUp();

  // Return
  return response(baseResponse.SUCCESS);
}
module.exports = {
  signUp,
};
