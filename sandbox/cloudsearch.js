const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-west-2' });

const csd = new AWS.CloudSearchDomain({
    endpoint: 'search-td-notes-search-fl6g4mlngcdmbjejvkzocu5qbq.us-west-2.cloudsearch.amazonaws.com'
});

csd.search({
    query: "mobile usb"
}, (err, data)=>{
    if(err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
});