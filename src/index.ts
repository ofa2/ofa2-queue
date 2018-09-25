import bb from 'bluebird';
import Queue from 'amqp-queue';

export default function lift() {
  let queue = new Queue(this.config.connections.queue.name, this.config.connections.queue);

  queue.createAndSave = function(name, data) {
    let job = queue.create(name, data);
    return bb.promisify(job.save, { context: job })();
  };
}
