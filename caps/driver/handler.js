'use strict';

const { ReceiveMessageCommand, DeleteMessageCommand, SendMessageCommand } = require('@aws-sdk/client-sqs');
const { sqsClient, QUEUES } = require('../util');

async function deliver(payload) {
    console.log('Driver delivered order:', payload.orderId);
    const deliveryNotification = {
        orderId: payload.orderId,
        status: 'Delivered',
        time: new Date().toISOString()
    };

    try {
        await sqsClient.send(new SendMessageCommand({
            MessageBody: JSON.stringify(deliveryNotification),
            QueueUrl: payload.vendorUrl, 
        }));
        console.log('Delivery notification sent for order:', payload.orderId);
    } catch (e) {
        console.error('Failed to send delivery notification', e);
    }
}

async function handlePickup() {
    try {
        const received = await sqsClient.send(
            new ReceiveMessageCommand({
                QueueUrl: QUEUES.pickup,
            })
        );
        if (received.Messages?.length > 0) {
            const payload = JSON.parse(received.Messages[0].Body);
            console.log('Driver received the package:', payload);

            // Simulate delivery delay
            setTimeout(() => {
                deliver(payload);
            }, 3000); // Adjust the delay as needed

            // Delete the message from the queue
            await sqsClient.send(
                new DeleteMessageCommand({
                    QueueUrl: QUEUES.pickup,
                    ReceiptHandle: received.Messages[0].ReceiptHandle,
                })
            );
        } else {
            console.log('No pickup ready');
            setTimeout(handlePickup, 1000); // Poll the queue again after 1 second
        }
    } catch (e) {
        console.error('handlePickup failed', e);
    }
}

function startDriver() {
    console.log('Driver is ready');
    handlePickup();
}

module.exports = startDriver;
