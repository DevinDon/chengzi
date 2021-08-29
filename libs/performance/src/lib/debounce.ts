/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (fn: any, interval = 300) => {
  let timer = -1;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.call(this, ...args), interval) as any;
  };
};
