import constate from 'constate';
import { useCallback, useEffect, useState } from 'react';
import { loadCategories, saveCategories } from './data';

// 1️⃣ Create a custom hook that receives props
const useCategorieser = ({ initial = loadCategories() }) => {
  const [categories, setCategories] = useState(initial);
  useEffect(() => {
    saveCategories(categories);
  }, [categories]);
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
};

// 3️⃣ Wrap your hook with the constate factory splitting the values
export const [CategoriesProvider, useCategories, useCategoryInsert, useCategoryRemove, useCategoryUpdate] = constate(
  useCategorieser,
  value => value.categories,
  value => value.insert,
  value => value.remove,
  value => value.update,
);
