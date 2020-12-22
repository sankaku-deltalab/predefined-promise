import EventEmitter from "eventemitter3";
import { PredefinedPromise } from "../src";

describe("PredefinedPromise", () => {
  it("can resolve before assigned to event emitter", async () => {
    const pp = new PredefinedPromise<number>();
    const event = new EventEmitter<{
      someEvent: [number];
    }>().on("someEvent", (val) => pp.resolve(val));

    const waiting = pp.wait();

    const eventValue = 2;
    event.emit("someEvent", eventValue);

    const gottenValue = await waiting;

    expect(gottenValue).toBe(eventValue);
  });

  it("can reject before assigned to event emitter", async () => {
    const pp = new PredefinedPromise<number>();
    const event = new EventEmitter<{
      someEvent: [number];
    }>().on("someEvent", (val) => pp.reject(new Error(`val is ${val}`)));

    const f = async () => {
      const waiting = pp.wait();
      const eventValue = 2;
      event.emit("someEvent", eventValue);
      return waiting;
    };

    expect(f).rejects.toEqual(new Error("val is 2"));
  });

  it("can resolve after event emitted", async () => {
    const pp = new PredefinedPromise<number>();
    const event = new EventEmitter<{
      someEvent: [number];
    }>().on("someEvent", (val) => pp.resolve(val));

    const eventValue = 2;
    event.emit("someEvent", eventValue);

    const gottenValue = await pp.wait();

    expect(gottenValue).toBe(eventValue);
  });
});
