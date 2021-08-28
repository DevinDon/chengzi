import constate from 'constate';
import { useCallback, useState } from 'react';
import { categories } from './data';

// 1️⃣ Create a custom hook that receives props
const useCategorieser = ({ initial = categories }) => {
  const [categories, setCategories] = useState(initial);
  // 2️⃣ Wrap your updaters with useCallback or use dispatch from useReducer
  const insert = useCallback(
    newCategory =>
      setCategories(prev => [...prev, newCategory]),
    [],
  );
  const remove = useCallback(
    name =>
      setCategories(prev => prev.filter(category => category.name !== name)),
    [],
  );
  const update = useCallback(
    newCategory =>
      setCategories(prev => [...prev.filter(category => category.name !== newCategory.name), newCategory]),
    [],
  );
  return { categories, insert, remove, update };
}

// 3️⃣ Wrap your hook with the constate factory splitting the values
export const [CategoriesProvider, useCategories, useCategoryInsert, useCategoryRemove, useCategoryUpdate] = constate(
  useCategorieser,
  value => value.categories,
  value => value.insert,
  value => value.remove,
  value => value.update,
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
//     <CounterProvider initialCount={10} >
//     <Count />
//     < Button />
//     </CounterProvider>
//   );
// }
