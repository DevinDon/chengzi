import { createContext, ReactNode } from 'react';
import type { Item } from '../states';

export interface MenuAction {
  icon?: ReactNode;
  title: string;
  onClick?: <T = unknown>(...args: T[]) => void;
}

export interface MenuContextValue {
  openContextMenu: (event: React.MouseEvent<HTMLElement, MouseEvent>, item: Item) => void;
}

export const MenuContext = createContext<MenuContextValue>(null as unknown as MenuContextValue);
