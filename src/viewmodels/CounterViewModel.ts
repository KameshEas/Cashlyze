export type CounterSubscriber = (count: number) => void;

export class CounterViewModel {
  private count: number;
  private subscribers: Set<CounterSubscriber>;

  constructor(initial = 0) {
    this.count = initial;
    this.subscribers = new Set();
  }

  getCount() {
    return this.count;
  }

  increment() {
    this.count += 1;
    this.notify();
  }

  decrement() {
    this.count -= 1;
    this.notify();
  }

  reset(value = 0) {
    this.count = value;
    this.notify();
  }

  subscribe(cb: CounterSubscriber) {
    this.subscribers.add(cb);
    // push current value immediately
    cb(this.count);
    return () => this.subscribers.delete(cb);
  }

  private notify() {
    for (const cb of this.subscribers) cb(this.count);
  }
}