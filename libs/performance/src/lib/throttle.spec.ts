import { throttle } from './throttle';
import { sleep } from './sleep';

describe('throttle', () => {

  it('should work', async () => {
    let count = 0;
    const add = throttle(() => count += 1, 100);
    add();
    add();
    add();
    await sleep(500);
    add();
    await sleep(10);
    add();
    expect(count).toEqual(2);
  });

});
