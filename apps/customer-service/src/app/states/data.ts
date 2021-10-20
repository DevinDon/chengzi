import { debounce } from '@chengzi-tools/performance';
import type { Category as RawCategory, Item as RawItem } from '@prisma/client';
import type { Prettify } from '@rester/utils';

export type Category = Prettify<
  Pick<RawCategory, 'id' | 'name'>
  & Partial<Pick<RawCategory, 'createdAt' | 'updatedAt'>>
>;

export type Item = Prettify<
  Pick<RawItem, 'id' | 'content' | 'categoryId' | 'frequency'>
  & Partial<Pick<RawItem, 'createdAt' | 'updatedAt'>>
>;

export type ItemArgs = Prettify<
  Partial<Omit<Item, 'category'>> & Pick<Item, 'categoryId'>
>;

export const categories: Category[] = [];

export const items: Item[] = [];

const ITEM_KEY = 'customer-service/items';

export const saveItems = debounce(
  (items: Item[]) => {
    localStorage.setItem(ITEM_KEY, JSON.stringify(items));
  },
);

export const loadItems = (): Item[] =>
  JSON.parse(localStorage.getItem(ITEM_KEY) || 'null') || items;

const CATEGORIES_KEY = 'customer-service/categories';

export const saveCategories = debounce(
  (categories: Category[]) => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  },
);

export const loadCategories = (): Category[] =>
  JSON.parse(localStorage.getItem(CATEGORIES_KEY) || 'null') || categories;
