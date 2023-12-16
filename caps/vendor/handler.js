'use strict';

const AWS = require('aws-sdk');
const Chance = require('chance');
const { sqsClient, QUEUES } = require('../util');

AWS.config.update({ region: 'us-east-1' });
const sns = new AWS.SNS();
const chance = new Chance();
const topicArn = 'arn:aws:sns:us-east-1:470644768484:capsMessages'; 
const store = '1-206-flowers';

async function sendPickup() {
  const payload = {
    store,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    vendorUrl: QUEUES.vendorQueue, 
  };

  console.log('Vendor asking for pickup', payload);

  try {
    const message = await sns.publish({
      Message: JSON.stringify(payload),
      TopicArn: topicArn,
    }).promise();

    console.log('Vendor sent pickup request', message.MessageId);
    return message;
  } catch (e) {
    console.error('Failed to send the pickup message', e);
  }
}

function startVendor() {
  setInterval(() => {
    sendPickup();
  }, 5000); 
}

module.exports = startVendor;
