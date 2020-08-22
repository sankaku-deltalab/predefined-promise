# predefined-promise

## Usage

```typescript
import EventEmitter from 'eventemitter3';
import PredefinedPromise from 'predefined-promise';

const asyncFunc = (): Promise<number> => {
  const pp = new PredefinedPromise<number>();
  const event = new EventEmitter<{
    someEvent: [number]
  }>().on('someEvent', (val) => pp.finish(val));

  const waiting = pp.wait();

  event.emit('someEvent', eventValue);

  return await waiting;
};
```

## Installing

```bash
npm add predefined-promise
```
