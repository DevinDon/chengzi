export interface Item {
  frequency: number;
  content: string;
}

export interface Category {
  key: string;
  name: string;
  order: number;
  items: Item[];
}

export const data: Category[] = [
  {
    key: 'greeting',
    name: '问候语',
    order: 1,
    items: [
      { frequency: 10, content: '你好，我是小美1' },
      { frequency: 123, content: '你好，我是小美2' },
      { frequency: 0, content: '你好，我是小美3' },
      { frequency: 1999, content: '你好，我是小美4' },
      { frequency: 2, content: '你好，我是小美5' },
    ],
  },
  {
    key: 'question',
    name: '询问问题',
    order: 2,
    items: [
      { frequency: 10, content: '你好，我是小美1' },
      { frequency: 123, content: '你好，我是小美2' },
      { frequency: 0, content: '你好，我是小美3' },
      { frequency: 1999, content: '你好，我是小美4' },
      { frequency: 2, content: '你好，我是小美5' },
    ],
  },
  {
    key: 'dealing',
    name: '处理问题',
    order: 3,
    items: [
      { frequency: 10, content: '你好，我是小美1' },
      { frequency: 123, content: '你好，我是小美2' },
      { frequency: 0, content: '你好，我是小美3' },
      { frequency: 1999, content: '你好，我是小美4' },
      { frequency: 2, content: '你好，我是小美5' },
    ],
  },
  {
    key: 'end',
    name: '结束语',
    order: 4,
    items: [
      { frequency: 6, content: '你好，我是小美6' },
      { frequency: 12, content: '你好，我是小美7' },
      { frequency: 19, content: '你好，我是小美8' },
      { frequency: 1, content: '你好，我是小美9' },
    ],
  },
];
