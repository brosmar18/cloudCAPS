# Lab - Class 19

## Project: Cloud CAPS
## Problem Domain

The goal of this project is to architect and implement a serverless cloud-based solution for a Courier, Administration, and Processing System (CAPS). The system simulates a real-world scenario where vendors dispatch pickup requests, and drivers process these requests in a coordinated and orderly fashion.



## API UML

[Cloud Caps](./assets/cloudcapsUML.png)


### Collaborators
- **ChatGPT by OpenAI**: Used as a programming partner for brainstorming ideas, debugging code, formulating tests, and drafting documentation. ChatGPT's contributions were invaluable in enhancing the efficiency and quality of the development process.

### Setup

#### `.env` requirements (where applicable)

A .env file is included in local repository. A .env-sample file is uploaded to the remote repo so collaborators understand what environmental variables are being used. 

#### How to initialize/run your application (where applicable)

- e.g. `npm start`

#### How to use your library (where applicable)


## API Endpoints

The following section outlines the root URL, available routes, expected inputs, and outputs for the API.

## Features

1. **Vendor Order Simulation**:
   - The `vendor.js` script simulates order placement by vendors at regular intervals (every 5 seconds).
   - Each order contains randomized details such as order ID, customer name, and address.
   - The vendor's specific SQS queue URL is included in each order for delivery notifications.

2. **AWS SNS Integration**:
   - Orders generated by vendors are published to an AWS SNS topic (`capsMessages`).
   - This setup ensures reliable delivery of messages and decouples the vendor application from direct interaction with the queues.

3. **SQS FIFO Queue for Order Processing**:
   - A FIFO SQS queue (`capsPickup.fifo`) receives and stores pickup requests in the exact order of their arrival.
   - This queue maintains the sequence of orders, ensuring that they are processed in a first-come, first-served manner.

4. **Driver Application for Order Fulfillment**:
   - The `driver.js` script polls the FIFO queue for new pickup requests.
   - Upon receiving an order, the script simulates a delivery process, including a delay to mimic real-world conditions (configurable, default is 3 seconds).

5. **Delivery Notification to Vendors**:
   - After simulating the delivery, the driver application sends a delivery notification to the vendor's specific SQS queue.
   - The notification includes the order ID and a timestamp, providing vendors with real-time delivery updates.
