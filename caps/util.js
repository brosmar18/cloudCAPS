'use strict';

const clientSqs = require('@aws-sdk/client-sqs');

const { SQSClient } = clientSqs;

const REGION = 'us-east-1';
const sqsClient = new SQSClient({ region: REGION });

const QUEUES = {
  pickup: 'https://sqs.us-east-1.amazonaws.com/470644768484/capsPickup.fifo',
  vendorQueue: 'https://sqs.us-east-1.amazonaws.com/470644768484/vendor.fifo', 

};

module.exports = { sqsClient, QUEUES };
