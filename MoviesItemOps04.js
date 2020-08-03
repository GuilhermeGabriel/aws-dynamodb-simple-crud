const AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT
});

const docClient = new AWS.DynamoDB.DocumentClient()

const table = "Movies000";
const year = 2013;
const title = "Rush";

// Increment an atomic counter
const params = {
  TableName: table,
  Key: {
    "year": year,
    "title": title
  },
  UpdateExpression: "set info.rating = info.rating + :val",
  ExpressionAttributeValues: {
    ":val": 1
  },
  ReturnValues: "UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function (err, data) {
  if (err) {
    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
  }
});
