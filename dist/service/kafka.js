"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_node_1 = require("kafka-node");
const config = require(`${process.cwd()}/config`).default;
exports.default = (app) => {
    if (config.kafka && config.kafka.enable) {
        // tslint:disable-next-line: one-variable-per-declaration
        const options = config.kafka.options;
        // tslint:disable-next-line: one-variable-per-declaration
        const client = new kafka_node_1.KafkaClient(options.producer), producer = new kafka_node_1.Producer(client), consumer = new kafka_node_1.Consumer(client, options.consumer.topic, options.consumer.options);
        producer.on('ready', () => {
            // app
            //   .logger
            //   .info(`Kafka connect to: ${config.kafka.kafkaHost}`);
            console.log(`Kafka connect to: ${options.producer.kafkaHost}`);
        });
        producer.on('error', (err) => {
            // app
            //   .logger
            //   .error(`Kafka connect to ${config.kafka.kafkaHost} error: ${err}`);
            console.error(`Kafka connect to ${options.producer.kafkaHost} error: ${err}`);
        });
        return {
            client, producer, consumer,
        };
    }
    return undefined;
};
//# sourceMappingURL=kafka.js.map