/**
 * PredefinedPromise is targeting to reference `resolve` and `reject` before create Promise instance.
 *
 * @example
 * import EventEmitter from "eventemitter3";
 * import { PredefinedPromise } from "predefined-promise";
 *
 * const event = new EventEmitter<{
 *   resolveEvent: [number];
 *   rejectEvent: [string];
 * }>();
 *
 * const asyncFunc = (): Promise<number> => {
 *   const pp = new PredefinedPromise<number>();
 *   const resolving = (val: number) => pp.resolve(val);
 *   const rejecting = (reason: string) => pp.reject(new Error(reason));
 *   event.on("resolveEvent", resolving);
 *   event.on("rejectEvent", rejecting);
 *
 *   return pp.wait().finally(() => {
 *     event.off("resolveEvent", resolving);
 *     event.off("rejectEvent", rejecting);
 *   });
 * };
 */
export class PredefinedPromise<T> {
  private resolveValue?: { value: T };
  private rejectValue?: { reason: Error };

  private resolveCallback?: (value: T) => void;
  private rejectCallback?: (reason: Error) => void;

  /**
   * Return promise finished when called this.finish.
   *
   * If already finished, end this function immediately.
   */
  async wait(): Promise<T> {
    if (this.rejectValue) {
      throw this.rejectValue.reason;
    }
    if (this.resolveValue) {
      return this.resolveValue.value;
    }

    const result = await new Promise<T>(
      (
        resolve: ((value: T) => void) | undefined,
        reject: ((reason: Error) => void) | undefined
      ) => {
        this.resolveCallback = resolve;
        this.rejectCallback = reject;
      }
    );
    return result;
  }

  /**
   * Resolve this.wait promise.
   *
   * @param value Value would be returned by this.wait promise.
   */
  resolve(value: T): void {
    this.resolveValue = { value: value };
    if (this.resolveCallback) this.resolveCallback(value);
  }

  /**
   * Reject this.wait promise.
   *
   * @param reason Error would be throw in this.wait promise.
   */
  reject(reason: Error): void {
    this.rejectValue = { reason };
    if (this.rejectCallback) this.rejectCallback(reason);
  }
}
