'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const message = process.argv[2];

const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-east-1:470644768484:capsMessages';

const payload = {
  Message: message,
  TopicArn: topic,
};

sns.publish(payload).promise()
  .then(data => console.log(data))
  .catch(err => console.log(err));