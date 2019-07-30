import {
  Consumer,
  ConsumerGroup,
  KafkaClient,
  KafkaClientOptions,
  Producer,
} from 'kafka-node';
const config = require(`${process.cwd()}/config`).default;
interface IKafkaApp {
  client: KafkaClient;
  producer: Producer;
  consumer: Consumer;
}
export default (app) => {
  if (config.kafka && config.kafka.enable) {
    // tslint:disable-next-line: one-variable-per-declaration
    const options = config.kafka.options;
    // tslint:disable-next-line: one-variable-per-declaration
    const client = new KafkaClient(options.producer),
      producer = new Producer(client),
      consumer = new Consumer(
        client,
        options.consumer.topic,
        options.consumer.options,
      );
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
    } as IKafkaApp;
  }
  return undefined;
};
