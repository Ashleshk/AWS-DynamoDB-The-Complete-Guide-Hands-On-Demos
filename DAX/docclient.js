const AWS = require("aws-sdk");
AWS.config.update({ region: 'ap-south-1' });

const AmazonDaxClient = require("amazon-dax-client");
const dax = new AmazonDaxClient({
    endpoints:['dax-notes-app.guft7f.clustercfg.dax.aps1.cache.amazonaws.com:8111'],
    region:'ap-south-1'
});

const docClient = new AWS.DynamoDB.DocumentClient({
    service: dax
});

exports.handler = (event, context, callback) => {
    docClient.get({
        TableName: 'td_notes_test',
        Key: {
            user_id: event.user_id,
            timestamp: parseInt(event.timestamp)
        }
    }, (err, data)=>{
        if(err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
};