import { createContext } from 'react';

export interface DialogContextValue {
  openConfirmDialog: () => void;
  openEditorDialog: () => void;
}

export const DialogContext = createContext<DialogContextValue>(null as unknown as DialogContextValue);
