/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const throttle = <F extends Function>(fn: F, delay = 300): F => {
  let runnable = true;
  return ((...args: any) => {
    if (!runnable) { return; }
    runnable = false;
    setTimeout(() => runnable = true, delay);
    return fn.call(this, ...args);
  }) as unknown as F;
};
