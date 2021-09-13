import constate from 'constate';
import { useCallback, useEffect, useState } from 'react';
import type { Category } from '.';
import { loadCategories, saveCategories } from './data';

// 1️⃣ Create a custom hook that receives props
const useCategorieser = ({ initial = loadCategories() }) => {
  const [categories, setCategories] = useState(initial);
  useEffect(() => {
    saveCategories(categories);
  }, [categories]);
  // 2️⃣ Wrap your updaters with useCallback or use dispatch from useReducer
  const insert = useCallback(
    (newCategory: Category) =>
      setCategories(prev => [...prev, newCategory]),
    [],
  );
  const remove = useCallback(
    (id: Category['id']) =>
      setCategories(prev => prev.filter(category => category.id !== id)),
    [],
  );
  const update = useCallback(
    (newCategory: Category) =>
      setCategories(prev => [...prev.filter(category => category.id !== newCategory.id), newCategory]),
    [],
  );
  const select = useCallback(
    (id: Category['id']) =>
      categories.find(category => category.id === id),
    [categories],
  );
  return { categories, insert, remove, update, select };
};

// 3️⃣ Wrap your hook with the constate factory splitting the values
export const [
  CategoriesProvider,
  useCategories,
  useCategoryInsert,
  useCategoryRemove,
  useCategoryUpdate,
  useCategorySelect,
] = constate(
  useCategorieser,
  value => value.categories,
  value => value.insert,
  value => value.remove,
  value => value.update,
  value => value.select,
);
