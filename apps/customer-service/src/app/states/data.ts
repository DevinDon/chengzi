import { debounce } from '@chengzi-tools/performance';

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
    name: '表达歉意',
    order: 4,
  },
  {
    name: '结束语',
    order: 5,
  },
];

export const items: Item[] = [
  { id: '1', frequency: 0, content: '亲，您好，小电商家专线，我是追追,很高兴为您服务~', category: '问候语' },
  { id: '2', frequency: 0, content: '你好，我是小美1', category: '询问问题' },
  { id: '6', frequency: 0, content: '很高兴帮您解决了问题，请问还有其他可以帮助您的嘛？', category: '询问问题' },
  { id: '7', frequency: 0, content: '请问您遇到的是哪方面的问题？', category: '询问问题' },
  { id: '8', frequency: 0, content: '请问还有其他可以帮助您的嘛？', category: '询问问题' },
  { id: '3', frequency: 0, content: '好的亲，客服已经把问题反馈给了技术部门，请您稍候~', category: '处理问题' },
  { id: '4', frequency: 0, content: '很抱歉亲，这个问题不在我们的业务范围内，客服无法给您提供建议', category: '表达歉意' },
  { id: '9', frequency: 0, content: '很抱歉亲，给您带来了不便，请您不要介意', category: '表达歉意' },
  { id: '5', frequency: 0, content: '亲，感谢您的来访，本次会话到此结束。如果您对追追的服务满意的话，请记得好评哦~', category: '结束语' },
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
