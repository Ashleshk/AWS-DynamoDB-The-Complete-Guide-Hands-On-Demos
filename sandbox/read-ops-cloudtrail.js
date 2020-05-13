const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-west-2' });

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.scan({
    TableName: 'td_keys'
}, (err, data)=>{
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});