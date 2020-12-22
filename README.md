# predefined-promise

PredefinedPromise is targeting to reference `resolve` and `reject` before create Promise instance.

## Usage

```typescript
import EventEmitter from "eventemitter3";
import { PredefinedPromise } from "predefined-promise";

const event = new EventEmitter<{
  resolveEvent: [number];
  rejectEvent: [string];
}>();

const asyncFunc = (): Promise<number> => {
  const pp = new PredefinedPromise<number>();
  const resolving = (val: number) => pp.resolve(val);
  const rejecting = (reason: string) => pp.reject(new Error(reason));
  event.on("resolveEvent", resolving);
  event.on("rejectEvent", rejecting);

  return pp.wait().finally(() => {
    event.off("resolveEvent", resolving);
    event.off("rejectEvent", rejecting);
  });
};

```

## Installing

```bash
npm add predefined-promise
```
