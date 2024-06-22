const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: "ap-northeast-2" });
const { v4 } = require("uuid");
const IMAGE_BUCKET_NAME = "molip-images";

async function uploadImageToS3(data) {
  const { image_file: file } = data;
  console.log(Buffer.from(file, "binary"));

  // 파일의 mime 타입 확인
  const contentType = file.mimetype || getMimeType(file);

  // Public Read 권한을 가진 이미지 업로드
  const uploadParams = {
    Bucket: IMAGE_BUCKET_NAME,
    Key: `${v4().replace(/-/g, "").substring(0, 10)}_${
      file.originalname ?? ""
    }`,
    Body: Buffer.from(file, "binary"),
    ContentType: contentType,
    ACL: "public-read",
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    return data.Location;
  } catch (err) {
    console.error("Error", err);
    throw new Error("Failed to upload file: " + err.message);
  }
}

function getMimeType(file) {
  const extension = file.name.split(".").pop(); // 파일 확장자 추출
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
    // 다른 파일 확장자에 대한 mime 타입 추가
    default:
      mimeType = "application/octet-stream"; // 기본적으로 binary 데이터로 처리
  }

  return mimeType;
}

module.exports = {
  uploadImageToS3,
};
