const fs = require("fs");
const filePath = "./test.jpg";
const imageFile = fs.readFileSync(filePath);

async function callApi() {
  const form = new FormData();
  form.append("image_file", imageFile);
  await fetch(
    "https://yvn47itsk7gktfq7sz3bw5vpru0bkknb.lambda-url.ap-northeast-2.on.aws/app/image",
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: form,
    }
  );
}
callApi().then(() => console.log("done"));
