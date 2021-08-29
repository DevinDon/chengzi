import { debounce } from './debounce';
import { sleep } from './sleep';

describe('debounce', () => {

  it('should work', async () => {
    let count = 0;
    const add = debounce(() => count += 1, 100);
    add();
    add();
    add();
    await sleep(200);
    add();
    await sleep(10);
    add();
    await sleep(105);
    expect(count).toEqual(2);
  });

});
