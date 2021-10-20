import constate from 'constate';
import { useCallback, useEffect, useState } from 'react';
import type { Category, Item } from './data';
import { loadCategories, saveCategories } from './data';

// 1️⃣ Create a custom hook that receives props
const useCategorieser = ({ initial = loadCategories() }) => {
  const [categories, setCategories] = useState(initial);
  useEffect(() => {
    saveCategories(categories);
  }, [categories]);
  // 2️⃣ Wrap your updaters with useCallback or use dispatch from useReducer
  const insert = useCallback(
    async (newCategory: Pick<Category, 'name'>) => {
      const response = await fetch('/api/categories', { method: 'POST', body: JSON.stringify(newCategory), headers: { 'content-type': 'application/json' } });
      const data = await response.json();
      if (response.status < 300) {
        return setCategories(prev => [...prev, data]);
      }
      throw new Error(data.join());
    },
    [],
  );
  const remove = useCallback(
    async (id: Category['id'], deleteItems: boolean = false) => {
      const response = await fetch(`/api/categories/${id}?deleteItems=${deleteItems}`, { method: 'DELETE' });
      const data = await response.json();
      if (response.status < 300) {
        return setCategories(prev => prev.filter(category => category.id !== id));
      }
      throw new Error(data.join());
    },
    [],
  );
  const update = useCallback(
    async (id: Category['id'], newCategory: Pick<Category, 'name'>) => {
      const response = await fetch(`/api/categories/${id}`, { method: 'PATCH', body: JSON.stringify(newCategory), headers: { 'content-type': 'application/json' } });
      const data = await response.json();
      if (response.status < 300) {
        return setCategories(prev => [...prev.filter(category => category.id !== id), data]);
      }
      throw new Error(data.join());
    },
    [],
  );
  const select = useCallback(
    (id: Category['id'] | Item['categoryId']) =>
      id === null
        ? { name: '未分类' }
        : categories.find(category => category.id === id),
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
