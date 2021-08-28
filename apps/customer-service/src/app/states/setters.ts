import { Reducer } from 'react';
import { createTeleReducer } from 'tele-state';
import { debounce } from '../utils/debounce';
import { Category, data } from './data';

export const saveDataWithStringify = debounce(
  (data: Category[]) => {
    localStorage.setItem('consumer-service/data', JSON.stringify(data));
  },
);

const dataReducer: Reducer<Category[], { payload: Category[] }> = (data, { payload }) => {
  return payload;
};

export const {
  useTeleReducer: useDataReducer,
  dispatch: dispatchData,
} = createTeleReducer(dataReducer, data);
