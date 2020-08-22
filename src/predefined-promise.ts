/**
 * PredefinedPromise.
 *
 * @example
 * import EventEmitter from 'eventemitter3';
 * import PredefinedPromise from 'predefined-promise';
 *
 * const asyncFunc = (): Promise<number> => {
 *   const pp = new PredefinedPromise<number>();
 *   const event = new EventEmitter<{
 *     someEvent: [number]
 *   }>().on('someEvent', (val) => pp.finish(val));
 *
 *   const waiting = pp.wait();
 *
 *   event.emit('someEvent', eventValue);
 *
 *   return await waiting;
 * };
 */
export default class PredefinedPromise<T> {
  private result?: { result: T };

  private resolve?: (result: T) => void;

  /**
   * Return promise finished when called this.finish.
   *
   * If already finished, end this function immediately.
   */
  async wait(): Promise<T> {
    if (this.result) {
      return this.result.result;
    }

    const result = await new Promise<T>((resolve: ((result: T) => void) | undefined) => {
      this.resolve = resolve;
    });
    return result;
  }

  /**
   * Finish this.wait promise.
   *
   * @param value Value would be returned by this.wait promise.
   */
  finish(value: T): void {
    this.result = { result: value };
    if (this.resolve) this.resolve(value);
  }
}
