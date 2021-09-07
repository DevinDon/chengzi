import constate from 'constate';
import { useCallback, useEffect, useState } from 'react';
import { Item, loadItems, saveItems } from './data';

// 1️⃣ Create a custom hook that receives props
const useItemser = ({ initial = loadItems() }) => {
  const [items, setItems] = useState(initial);
  useEffect(() => {
    saveItems(items);
  }, [items]);
  // 2️⃣ Wrap your updaters with useCallback or use dispatch from useReducer
  const insert = useCallback(
    (newItem: Item) =>
      setItems(prev => [...prev, newItem]),
    [],
  );
  const remove = useCallback(
    (id: Item['id']) =>
      setItems(prev => prev.filter(item => item.id !== id)),
    [],
  );
  const update = useCallback(
    (newItem: Item) =>
      setItems(prev => [...prev.filter(item => item.id !== newItem.id), newItem]),
    [],
  );
  const increaseFrequency = useCallback(
    (id: Item['id']) =>
      setItems(prev => [
        ...prev.filter(item => item.id !== id),
        {
          ...prev.find(item => item.id === id) as Item,
          frequency: (prev.find(item => item.id === id) as Item).frequency + 1,
        },
      ]),
    [],
  );
  return { items, insert, remove, update, increaseFrequency };
};

// 3️⃣ Wrap your hook with the constate factory splitting the values
export const [ItemsProvider, useItems, useItemInsert, useItemRemove, useItemUpdate, useItemFrequencyIncrease] = constate(
  useItemser,
  value => value.items,
  value => value.insert,
  value => value.remove,
  value => value.update,
  value => value.increaseFrequency,
);
