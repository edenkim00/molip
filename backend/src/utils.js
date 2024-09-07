/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const { ENDPOINT_METADATA } = require("./metadata");
const parser = require("lambda-multipart-parser");

async function parseBody(event) {
  if (!event.body) {
    return undefined;
  }
  const contentType =
    (event?.headers?.["content-type"] || event?.headers?.["Content-Type"]) ??
    "application/json";

  if (!contentType.startsWith("multipart/form-data")) {
    return JSON.parse(event?.body);
  }
  const result = await parser.parse(event);
  console.log(result);
  console.log(result.files);

  return result;
}

async function parseEvent(event) {
  try {
    console.log(event);
    const body = await parseBody(event);

    const queryString = event.queryStringParameters || {};
    const requestData = event?.requestContext?.http;
    if (!requestData) return null;
    const { method: requestMethod, path } = requestData;
    const { method, tokenRequired, next, extraData } = ENDPOINT_METADATA.find(
      (meta) =>
        meta.endpoint === path &&
        meta.method === requestMethod &&
        (meta.tokenRequired ? !!event?.headers?.["x-access-token"] : true)
    );

    console.log(path, requestMethod, method, next);
    if (!(path && requestMethod)) return null;
    if (!(method && next)) return null;
    if (method !== requestMethod) return null;

    const accessToken = event?.headers?.["x-access-token"];
    if (tokenRequired && !accessToken) return null;

    return {
      method,
      path,
      tokenRequired,
      next,
      accessToken,
      data: {
        ...body,
        ...queryString,
        ...(extraData ?? {}),
      },
    };
  } catch (err) {
    console.error(err);
  }
  return null;
}

async function verifyAccessToken(token) {
  if (!token) {
    return null;
  }
  const p = new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedToken) => {
      if (err) reject(err);
      resolve(verifiedToken);
    });
  });
  try {
    return await p; // verified Token
  } catch (err) {
    console.error("[AUTH]: ", err);
    return null;
  }
}

function generateDateRanges(cutoffInDays = 7) {
  const today = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const dates = [];
  for (const date of Array(cutoffInDays).keys()) {
    const newDate = new Date(today);
    newDate.setDate(today.getDate() - date);
    dates.push(newDate);
  }
  return dates.map((date) => date.toISOString().split("T")[0]);
}

function getKSTDate(offsetInDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetInDays);

  const dt = date
    .toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
    })
    .split(" ")[0];
  const [month, day, year] = dt.split("/");
  console.log(month, day, year);

  return `${year.slice(0, 4)}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;
}

module.exports = {
  parseEvent,
  verifyAccessToken,
  generateDateRanges,
  getKSTDate,
};
