const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT
});


const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'Movies000';
const year = 2015;
const title = 'The big new movie';

const params = {
  TableName: table,
  Item: {
    "year": year,
    "title": title,
    "info": {
      "plot": "Nothing happens at all",
      "rating": 0
    }
  }
};

console.log('Adding new item...');
docClient.put(params, (err, data) => {
  if (err) {
    console.log("Unable to add item. Error JSON: ", JSON.stringify(err, null, 2));
  } else {
    console.log("Added item:", JSON.stringify(data, null, 2));
  }
});
