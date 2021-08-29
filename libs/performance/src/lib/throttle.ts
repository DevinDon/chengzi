/* eslint-disable @typescript-eslint/no-explicit-any */
export const throttle = (fn: any, delay = 300) => {
  let runnable = true;
  return (...args: any) => {
    if (!runnable) { return; }
    runnable = false;
    setTimeout(() => runnable = true, delay);
    return fn.call(this, ...args);
  };
};
