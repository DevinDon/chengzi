/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <F extends Function>(fn: F, interval = 300): F => {
  let timer = -1;
  return ((...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.call(this, ...args), interval) as any;
  }) as unknown as F;
};
