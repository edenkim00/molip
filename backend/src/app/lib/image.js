const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({ region: "ap-northease-2" });
const { v4 } = require("uuid");
const IMAGE_BUCKET_NAME = "molip-images";

async function uploadImageToS3(data) {
  const { image_file: file } = data;

  const uploadParams = {
    Bucket: IMAGE_BUCKET_NAME,
    Key: `${v4().replace(/-/g, "").substring(0, 10)}_${
      file.originalname ?? ""
    }`,
    Body: file.buffer,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    return data.Location;
  } catch (err) {
    console.error("Error", err);
    throw new Error("Failed to upload file: " + err.message);
  }
}

module.exports = {
  uploadImageToS3,
};