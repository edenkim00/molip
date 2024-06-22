const jwt = require("jsonwebtoken");
const { ENDPOINT_METADATA } = require("./metadata");
const Busboy = require("busboy");

async function parseBody(event) {
  const contentType =
    event?.headers?.["content-type"] || event?.headers?.["Content-Type"];
  if (contentType !== "multipart/form-data") {
    return JSON.parse(event.body);
  }

  return new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: { "content-type": contentType } });
    const result = { files: [], fields: {} };

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log(
        `File [${fieldname}]: filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
      );
      const fileChunks = [];
      file
        .on("data", (data) => {
          fileChunks.push(data);
        })
        .on("end", () => {
          console.log(`File [${fieldname}] Finished`);
          result.files.push({
            fieldname,
            filename,
            encoding,
            mimetype,
            file: Buffer.concat(fileChunks),
          });
        });
    });

    busboy.on("field", (fieldname, val) => {
      console.log(`Field [${fieldname}]: value: ${val}`);
      result.fields[fieldname] = val;
    });

    busboy.on("finish", () => {
      console.log("Done parsing form!");
      resolve(result);
    });

    busboy.on("error", (error) => {
      console.log("Error parsing form!");
      reject(error);
    });

    // eslint-disable-next-line no-undef
    busboy.write(Buffer.from(event.body, "base64"));
    busboy.end();
  });
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

module.exports = {
  parseEvent,
  verifyAccessToken,
};
