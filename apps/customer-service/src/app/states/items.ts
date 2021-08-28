import constate from 'constate';
import { useCallback, useState } from 'react';
import { Item, items } from './data';

// 1️⃣ Create a custom hook that receives props
const useItemser = ({ initial = items }) => {
  const [items, setItems] = useState(initial);
  // 2️⃣ Wrap your updaters with useCallback or use dispatch from useReducer
  const insert = useCallback(
    newItem =>
      setItems(prev => [...prev, newItem]),
    [],
  );
  const remove = useCallback(
    id =>
      setItems(prev => prev.filter(item => item.id !== id)),
    [],
  );
  const update = useCallback(
    newItem =>
      setItems(prev => [...prev.filter(item => item.id !== newItem.id), newItem]),
    [],
  );
  const updateFrequency = useCallback(
    (id: Item['id']) =>
      setItems(prev => [
        ...prev.filter(item => item.id !== id),
        {
          ...prev.find(item => item.id === id) as Item,
          frequency: (prev.find(item => item.id === id) as Item).frequency + 1
        },
      ]),
    [],
  );
  return { items, insert, remove, update, updateFrequency };
}

// 3️⃣ Wrap your hook with the constate factory splitting the values
export const [ItemsProvider, useItems, useItemInsert, useItemRemove, useItemUpdate, useItemUpdateFrequency] = constate(
  useItemser,
  value => value.items,
  value => value.insert,
  value => value.remove,
  value => value.update,
  value => value.updateFrequency,
);

// function Button() {
//   // 4️⃣ Use the updater context that will never trigger a re-render
//   const increment = useIncrement();
//   return <button onClick={ increment }> +</button>;
// }

// function Count() {
//   // 5️⃣ Use the state context in other components
//   const count = useCount();
//   return <span>{ count } < /span>;
// }

// function App() {
//   // 6️⃣ Wrap your components with Provider passing props to your hook
//   return (
//     <CounterProvider initialCount= { 10} >
//     <Count />
//     < Button />
//     </CounterProvider>
//   );
// }
