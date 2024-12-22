const express = require('express');


const app = express();
const port = 5001;

app.get('/water', (req, res) => {
    res.send('Response from water-service');
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});

const amqp = require('amqplib');

async function connect() {  
    
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'test';

    

    await channel.assertQueue(queue);
    channel.consume(queue, (msg) => {
        console.error('Received:', msg.content.toString());
        channel.ack(msg);
    });
}

connect();