import { debounce } from '../utils/debounce';

export interface Item {
  id: string;
  frequency: number;
  content: string;
  category: Category['name'];
}

export interface Category {
  name: string;
  order: number;
}

export const categories: Category[] = [
  {
    name: '问候语',
    order: 1,
  },
  {
    name: '询问问题',
    order: 2,
  },
  {
    name: '处理问题',
    order: 3,
  },
  {
    name: '结束语',
    order: 4,
  },
];

export const items: Item[] = [
  { id: '1', frequency: 10, content: '你好，我是小美1', category: '问候语' },
  { id: '2', frequency: 123, content: '你好，我是小美2', category: '问候语' },
  { id: '3', frequency: 0, content: '你好，我是小美3', category: '问候语' },
  { id: '4', frequency: 1999, content: '你好，我是小美4', category: '问候语' },
  { id: '5', frequency: 2, content: '你好，我是小美5', category: '问候语' },
  { id: '6', frequency: 10, content: '你好，我是小美1', category: '询问问题' },
  { id: '7', frequency: 123, content: '你好，我是小美2', category: '询问问题' },
  { id: '8', frequency: 0, content: '你好，我是小美3', category: '询问问题' },
  { id: '9', frequency: 1999, content: '你好，我是小美4', category: '询问问题' },
  { id: '10', frequency: 2, content: '你好，我是小美5', category: '询问问题' },
  { id: '11', frequency: 10, content: '你好，我是小美1', category: '处理问题' },
  { id: '12', frequency: 123, content: '你好，我是小美2', category: '处理问题' },
  { id: '13', frequency: 0, content: '你好，我是小美3', category: '处理问题' },
  { id: '14', frequency: 1999, content: '你好，我是小美4', category: '处理问题' },
  { id: '15', frequency: 2, content: '你好，我是小美5', category: '处理问题' },
  { id: '16', frequency: 6, content: '你好，我是小美6', category: '结束语' },
  { id: '17', frequency: 12, content: '你好，我是小美7', category: '结束语' },
  { id: '18', frequency: 19, content: '你好，我是小美8', category: '结束语' },
  { id: '19', frequency: 1, content: '你好，我是小美9', category: '结束语' },
];

const itemsKey = 'customer-service/items';

export const saveItems = debounce(
  (items: Item[]) => {
    localStorage.setItem(itemsKey, JSON.stringify(items));
  },
);

export const loadItems = (): Item[] =>
  JSON.parse(localStorage.getItem(itemsKey) || 'null') || items;

const categoriesKey = 'customer-service/categories';

export const saveCategories = debounce(
  (categories: Category[]) => {
    localStorage.setItem(categoriesKey, JSON.stringify(categories));
  },
);

export const loadCategories = (): Category[] =>
  JSON.parse(localStorage.getItem(categoriesKey) || 'null') || categories;
