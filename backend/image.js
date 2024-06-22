const fs = require("fs");
const filePath = "./test.jpg";
const imageFile = fs.readFileSync(filePath);
const axios = require("axios");

async function callApi() {
  const form = new FormData();
  console.log(imageFile);
  form.append("image_file", imageFile);

  try {
    await axios.post(
      "https://yvn47itsk7gktfq7sz3bw5vpru0bkknb.lambda-url.ap-northeast-2.on.aws/app/image",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (err) {
    console.log(err.response);
  }
}
callApi().then(() => console.log("done"));
