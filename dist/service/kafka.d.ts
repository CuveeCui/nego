import { Consumer, KafkaClient, Producer } from 'kafka-node';
interface IKafkaApp {
    client: KafkaClient;
    producer: Producer;
    consumer: Consumer;
}
declare const _default: (app: any) => IKafkaApp | undefined;
export default _default;
