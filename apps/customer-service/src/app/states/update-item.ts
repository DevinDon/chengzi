import type { Item } from './data';
import { dispatchDataState, findItemByID } from './getters';
import { saveDataWithStringify } from './setters';

export const updateItemContent = async ({ id, content }: Item) => {
  dispatchDataState(data => {
    const target = findItemByID(id);
    target && (target.content = content);
    saveDataWithStringify(data);
    return data;
  });
};

export const updateItemFrequency = async ({ id }: Item) => {
  dispatchDataState(data => {
    const target = findItemByID(id);
    target && (target.frequency += 1);
    saveDataWithStringify(data);
    return data;
  });
};
