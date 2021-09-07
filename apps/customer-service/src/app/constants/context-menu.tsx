import { PencilIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/outline';
import { createContext, ReactNode } from 'react';
import type { Item } from '../states';

export interface MenuAction {
  icon?: ReactNode;
  title: string;
  onClick?: <T = unknown>(...args: T[]) => void;
};

export const DEFAULT_MENU_ACTIONS: MenuAction[] = [
  { icon: <PencilIcon className="w-5 h-5" />, title: '编辑短语', onClick: () => console.log('Write a review') },
  { icon: <TrashIcon className="w-5 h-5" />, title: '删除短语', onClick: () => console.log('Write a review') },
  { icon: <QuestionMarkCircleIcon className="w-5 h-5" />, title: '查看帮助', onClick: () => console.log('Write a review') },
];

export interface MenuContextValue {
  openContextMenu: (event: React.MouseEvent<HTMLElement, MouseEvent>, id: Item['id']) => void;
}

export const MenuContext = createContext<MenuContextValue>(null as unknown as MenuContextValue);
