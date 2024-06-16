import { wait } from 'helpers/wait';

class Queue<T> {
  private items: T[];
  keys = new Set<string>();

  constructor() {
    this.items = [];
  }

  enqueue(item: T): void {
    const { key } = item as any;
    if (key && this.keys.has(key)) {
      throw new Error('DUPLICATE_KEY');
    }
    this.keys.add(key);
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  peek(): T | undefined {
    return this.items[0];
  }
}

export class QueueManager {
  queue = new Queue<{ key: string; fn: fn; onSuccess?: fn; onError?: fn; onResolved?: fn }>();
  isRunning = false;

  add({ key, fn, onSuccess, onError, onResolved }) {
    try {
      this.queue.enqueue({ key, fn, onSuccess, onError, onResolved });
      if (!this.isRunning) {
        this.isRunning = true;
        this.run();
      }
      return this.queue.size();
    } catch (ex) {
      return {
        error: 'There is already a refresh job running or in queue for this google account',
      };
    }
  }

  async run() {
    this.isRunning = true;
    if (this.queue.isEmpty()) {
      this.isRunning = false;
      return;
    }
    const { key, fn, onSuccess, onError, onResolved } = this.queue.dequeue();
    try {
      await fn();
      if (onSuccess) await onSuccess();
    } catch (ex) {
      if (onError) await onError(ex);
    } finally {
      if (onResolved) await onResolved();
      this.isRunning = false;
      this.queue.keys.delete(key);

      if (!this.queue.isEmpty()) {
        await wait(1000);
        await this.run();
      }
    }
  }
}
