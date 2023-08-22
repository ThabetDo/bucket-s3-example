var AWS = require("aws-sdk");
var fs = require("fs");
const accessKeyId = "YOUR_ACCESS_KEY_ID";
const secretAccessKey = "YOUR_SECRET_ACCESS_KEY";
const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region: "ap-south-1",
});

const bucketName = "payz365";
const newFileNameKey = `qrcode/qrcode-${Date.now()}.png`;
const filePath = "./1.png";
function uploadFile(filePath, bucketName, newFileNameKey) {
  const fileStream = fs.createReadStream(filePath);
  fileStream.on("error", (err) => {
    console.log(err);
  });

  const params = {
    Bucket: bucketName,
    Key: newFileNameKey,
    Body: fileStream,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log("File Error: ", err);
    }
    if (data) {
      console.log("Sucess: ", data.Location);
    }
  });
}

uploadFile(filePath, bucketName, newFileNameKey);
