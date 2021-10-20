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
    async (newItem: Item) => {
      const response = await fetch('/api/items', { method: 'POST', body: JSON.stringify(newItem), headers: { 'content-type': 'application/json' } });
      const data = await response.json();
      if (response.status < 300) {
        return setItems(prev => [...prev, data]);
      }
      throw new Error(data.join());
    },
    [],
  );
  const remove = useCallback(
    async (id: Item['id']) => {
      const response = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (response.status < 300) {
        return setItems(prev => prev.filter(item => item.id !== id));
      }
      throw new Error(data.join());
    },
    [],
  );
  const update = useCallback(
    async (id: Item['id'], newItem: Item) => {
      const response = await fetch(`/api/items/${id}`, { method: 'PATCH', body: JSON.stringify(newItem), headers: { 'content-type': 'application/json' } });
      const data = await response.json();
      if (response.status < 300) {
        return setItems(prev => [...prev.filter(item => item.id !== id), data]);
      }
      throw new Error(data.join());
    },
    [],
  );
  const increaseFrequency = useCallback(
    async (id: Item['id']) => {
      const response = await fetch(`/api/items/${id}?action=increase`, { method: 'PATCH', body: JSON.stringify({}), headers: { 'content-type': 'application/json' } });
      const data = await response.json();
      if (response.status < 300) {
        return setItems(prev => [...prev.filter(item => item.id !== id), data]);
      }
      throw new Error(data.join());
    },
    [],
  );
  return { items, insert, remove, update, increaseFrequency, setItems };
};

// 3️⃣ Wrap your hook with the constate factory splitting the values
export const [
  ItemsProvider,
  useItems,
  useItemInsert,
  useItemRemove,
  useItemUpdate,
  useItemFrequencyIncrease,
  useSetItems,
] = constate(
  useItemser,
  value => value.items,
  value => value.insert,
  value => value.remove,
  value => value.update,
  value => value.increaseFrequency,
  value => value.setItems,
);
