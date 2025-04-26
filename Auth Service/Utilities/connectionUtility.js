import amqplib from 'amqplib';

let connection = null;
let channel = null;

export const getRabbitMQChannel = async () => {
    if (channel) return channel;

    try {
        if (!connection) {
            connection = await amqplib.connect('amqp://rabbitmq'); // hostname = service name in Docker
        }

        channel = await connection.createChannel();
        return channel;
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        throw error;
    }
};
