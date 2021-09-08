import { createContext } from 'react';
import type { Item, ItemArgs } from '../states';

export interface DialogContextValue {
  openConfirmDialog: (item?: Item) => void;
  openEditorDialog: (item?: ItemArgs) => void;
}

export const DialogContext = createContext<DialogContextValue>(null as unknown as DialogContextValue);
