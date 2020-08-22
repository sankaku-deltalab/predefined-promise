import EventEmitter from 'eventemitter3';
import PredefinedPromise from '../src';

describe('PredefinedPromise', () => {
  it('can be used before assigned to event emitter', async () => {
    const pp = new PredefinedPromise<number>();
    const event = new EventEmitter<{
      someEvent: [number]
    }>().on('someEvent', (val) => pp.finish(val));

    const waiting = pp.wait();

    const eventValue = 2;
    event.emit('someEvent', eventValue);

    const gottenValue = await waiting;

    expect(gottenValue).toBe(eventValue);
  });

  it('can be used after event emitted', async () => {
    const pp = new PredefinedPromise<number>();
    const event = new EventEmitter<{
      someEvent: [number]
    }>().on('someEvent', (val) => pp.finish(val));

    const eventValue = 2;
    event.emit('someEvent', eventValue);

    const gottenValue = await pp.wait();

    expect(gottenValue).toBe(eventValue);
  });
});
