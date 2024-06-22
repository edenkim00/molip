const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: "ap-northeast-2" });
const { v4 } = require("uuid");
const IMAGE_BUCKET_NAME = "molip-images";
const { response, errResponse } = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
async function uploadImageToS3(data) {
  const { files } = data;
  const file = files[0];
  const contentType = file.contentType ?? getMimeType(file.filename);

  const uploadParams = {
    Bucket: IMAGE_BUCKET_NAME,
    Key: `${v4().replace(/-/g, "").substring(0, 10)}_${
      file.name ?? file.originalname ?? ""
    }`,
    Body: file.content,
    ContentType: contentType,
    ACL: "public-read",
  };

  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    return response(baseResponse.SUCCESS, {
      image_url: `https://${IMAGE_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${uploadParams.Key}`,
    });
  } catch (err) {
    console.error("[Image upload]", err);
    return errResponse(baseResponse.DB_ERROR);
  }
}

function getMimeType(file) {
  const extension = file.name?.split(".")?.pop(); // 파일 확장자 추출
  let mimeType = "";

  switch (extension) {
    case "jpg":
    case "jpeg":
      mimeType = "image/jpeg";
      break;
    case "png":
      mimeType = "image/png";
      break;
    case "gif":
      mimeType = "image/gif";
      break;
    default:
      mimeType = "application/octet-stream";
  }
  return mimeType;
}

module.exports = {
  uploadImageToS3,
};
