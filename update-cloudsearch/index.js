const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-west-2' });

const async = require("async");

const csd = new AWS.CloudSearchDomain({
    endpoint: 'doc-td-notes-search-fl6g4mlngcdmbjejvkzocu5qbq.us-west-2.cloudsearch.amazonaws.com'
});

exports.handler = (event, context, callback) => {
    async.map(event.Records, (record, callbackMap)=>{
        let user_id = record.dynamodb.Keys.user_id.S;
        let timestamp = record.dynamodb.Keys.timestamp.N;
        let id = user_id + '_' + timestamp;
        if(record.eventName == 'REMOVE') {
            callbackMap(null, {
                type: 'delete',
                id: id
            });
        } else {
            let newImage = record.dynamodb.NewImage;
            callbackMap(null, {
                type: 'add',
                id: id,
                fields: {
                    user_id: newImage.user_id.S,
                    timestamp: newImage.timestamp.N,
                    cat: newImage.cat.S,
                    title: newImage.title.S,
                    content: newImage.content.S,
                    note_id: newImage.note_id.S,
                    user_name: newImage.user_name.S,
                    expires: newImage.expires.N
                }
            });
        }
    }, (err, results)=>{
        csd.uploadDocuments({
            contentType: 'application/json',
            documents: JSON.stringify(results)
        }, (err, data)=>{
            if(err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
        callback(null, "Execution Completed");
    });
}