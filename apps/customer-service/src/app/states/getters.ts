import { createTeleState } from 'tele-state';
import { data } from './data';

export const {
  useTeleState: useData,
  dispatch: dispatchDataState,
} = createTeleState(data);

export const findItemByID = (id: string) => {
  return data
    .map(category => category.items)
    .flat()
    .find(item => item.id === id)
};
