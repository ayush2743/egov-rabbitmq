const express = require('express');
const amqp = require('amqplib');
const app = express();

const port = 5002;

app.get('/property', async (req, res) => {
    try {

        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();
        const queue = 'test';

        await channel.assertQueue(queue);

        channel.sendToQueue(queue, Buffer.from('Message from property-service'));

        console.log('Message sent to queue');

        res.send('Response from property-service');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})