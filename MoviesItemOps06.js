const AWS = require("aws-sdk");
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT
});

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "Movies000";
const year = 2013;
const title = "Rush";

const params = {
  TableName: table,
  Key: {
    "year": year,
    "title": title
  },
  ConditionExpression: "info.rating <= :val",
  ExpressionAttributeValues: {
    ":val": 8.0
  }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function (err, data) {
  if (err) {
    console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
  }
});
