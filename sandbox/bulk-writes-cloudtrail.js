const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-west-2' });

const docClient = new AWS.DynamoDB.DocumentClient();

const faker = require('faker');
const moment = require('moment');

setInterval(()=>{
    let params = {
        TableName: "td_keys"
    };

    generateItem((item)=>{
        params.Item = item;
        docClient.put(params, (err, data)=>{
            if(err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    });
}, 300);

function generateItem(callback) {
    callback({
        user_id: faker.random.uuid(),
        secret: moment().unix()
    });
}