export interface Item {
  id: string;
  frequency: number;
  content: string;
}

export interface Category {
  id: string;
  name: string;
  order: number;
  items: Item[];
}

export const data: Category[] = [
  {
    id: 'greeting',
    name: '问候语',
    order: 1,
    items: [
      { id: '1', frequency: 10, content: '你好，我是小美1' },
      { id: '2', frequency: 123, content: '你好，我是小美2' },
      { id: '3', frequency: 0, content: '你好，我是小美3' },
      { id: '4', frequency: 1999, content: '你好，我是小美4' },
      { id: '5', frequency: 2, content: '你好，我是小美5' },
    ],
  },
  {
    id: 'question',
    name: '询问问题',
    order: 2,
    items: [
      { id: '6', frequency: 10, content: '你好，我是小美1' },
      { id: '7', frequency: 123, content: '你好，我是小美2' },
      { id: '8', frequency: 0, content: '你好，我是小美3' },
      { id: '9', frequency: 1999, content: '你好，我是小美4' },
      { id: '10', frequency: 2, content: '你好，我是小美5' },
    ],
  },
  {
    id: 'dealing',
    name: '处理问题',
    order: 3,
    items: [
      { id: '11', frequency: 10, content: '你好，我是小美1' },
      { id: '12', frequency: 123, content: '你好，我是小美2' },
      { id: '13', frequency: 0, content: '你好，我是小美3' },
      { id: '14', frequency: 1999, content: '你好，我是小美4' },
      { id: '15', frequency: 2, content: '你好，我是小美5' },
    ],
  },
  {
    id: 'end',
    name: '结束语',
    order: 4,
    items: [
      { id: '16', frequency: 6, content: '你好，我是小美6' },
      { id: '17', frequency: 12, content: '你好，我是小美7' },
      { id: '18', frequency: 19, content: '你好，我是小美8' },
      { id: '19', frequency: 1, content: '你好，我是小美9' },
    ],
  },
];
