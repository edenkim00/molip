/* eslint-disable no-unused-vars */
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const jwt = require("jsonwebtoken");
const Service = require("../Service");
const Provider = require("../Provider");
const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

require("dotenv").config();

async function signUp(data) {
  // Validation
  // 1. 값이 다 있는지
  // 2. 아이디 길이 (5글자 이상 30자 이하)
  // 3. 비밀번호 길이 (8자 이상 20자 이하)
  // 4. 이메일 형식
  const { id, password, email } = data;

  if (!id || !password || !email) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  if (id.length > 30 || id.length < 5) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  if (password.length < 8 || password.length > 20) {
    return errResponse(baseResponse.WRONG_PASSWORD_LENGTH);
  }
  const wowie = await Provider.checkId(id);
  if (!wowie) {
    return errResponse(baseResponse.ALREADY_EXISTING_ID);
  }
  // Provider or Service
  try {
    await Service.signUp(id, password, email);
  } catch (err) {
    console.error(err);
    return errResponse(baseResponse.DB_ERROR);
  }

  // Return - Response
  return response(baseResponse.SUCCESS);
}

async function deleteUser(data, verifiedToken) {
  const userId = verifiedToken.userId;
  try {
    await Service.deleteUser(userId);
  } catch (err) {
    console.error(err);
    return errResponse(baseResponse.DB_ERROR);
  }

  // Return - Response
  return response(baseResponse.SUCCESS);
}

async function getUserProfile(data, verifiedToken) {
  const userId = verifiedToken.userId;
  const result = await Provider.getUserProfile(userId);
  if (result.length < 1) {
    return errResponse(baseResponse.NO_USER);
  }

  // Return - Response
  return response(baseResponse.SUCCESS, result[0]);
}

async function signIn(data) {
  const { id, password } = data;
  if (!id || !password) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  const result = await Provider.existUser(id, password);
  if (!result) {
    return errResponse(baseResponse.WRONG_LOGIN_DETAIL);
  }
  const publishedToken = jwt.sign(
    {
      userId: id,
    },
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
    {
      expiresIn: "365d",
      subject: "userInfo",
    }
  );
  const tokenBody = {
    token: publishedToken,
  };
  return response(baseResponse.SUCCESS, tokenBody);
}

async function changePassword(data) {
  const { id, newPassword } = data;
  if (!id || !newPassword) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  if (newPassword.length < 8 || newPassword.length > 20) {
    return errResponse(baseResponse.WRONG_BODY);
  }

  try {
    await Service.changePassword(id, newPassword);
  } catch (err) {
    console.error(err);
    return errResponse(baseResponse.DB_ERROR);
  }

  // Return - Response
  return response(baseResponse.SUCCESS);
}

async function requestEmailVerification(data) {
  const { email, shouldExist } = data;
  if (shouldExist) {
    const exist = await Provider.doesExistUserHaving(email);
    if (!exist) {
      // 6001
      return errResponse(baseResponse.EMAIL_DOES_NOT_EXIST);
    }
  }

  let authNum = Math.random().toString().substring(2, 8);
  // 7001
  if (!email) return response(baseResponse.WRONG_BODY);

  const mailPoster = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: "nlcsjejusportshall@gmail.com",
        // eslint-disable-next-line no-undef
        pass: process.env.EMAIL_AUTH_PASSWORD,
      },
    })
  );

  const mailOptions = {
    from: "nlcsjejusportshall@gmail.com",
    to: email,
    subject: "[Molip] Email Verification Code",
    text: "The Auth Code is " + authNum,
  };
  return new Promise((resolve) => {
    mailPoster.sendMail(mailOptions, function (error) {
      if (error) {
        //7002
        console.error("[Send Email]: ", error);
        return resolve(errResponse(baseResponse.EMAIL_SEND_ERROR));
      } else {
        resolve(response(baseResponse.SUCCESS, { code: authNum }));
      }
    });
  });
}

module.exports = {
  signUp,
  deleteUser,
  getUserProfile,
  signIn,
  changePassword,
  requestEmailVerification,
};
