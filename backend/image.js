const fs = require("fs");
const filePath = "./test.jpg";
const imageFile = fs.readFileSync(filePath);
const axios = require("axios");
// const FormData = require("form-data");

function getFileExtension(fileName) {
  return fileName.split(".").pop();
}

async function callApi() {
  const fileName = filePath.split("/").pop(); // Get file name from file path
  const fileExtension = getFileExtension(fileName); // Get file extension from file name

  console.log("File Name:", fileName);
  console.log("File Extension:", fileExtension);

  const form = new FormData();
  const blob = new Blob([imageFile], { type: `image/${fileExtension}` }); // Convert Buffer to Blob

  form.append("image_file", blob, fileName);

  try {
    await axios.post(
      "https://yvn47itsk7gktfq7sz3bw5vpru0bkknb.lambda-url.ap-northeast-2.on.aws/app/image",
      form,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
}

callApi().then(() => console.log("done"));
