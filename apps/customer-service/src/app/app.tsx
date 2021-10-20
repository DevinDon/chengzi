import { AppContainerComponent } from '@chengzi-tools/app-container';
import { CopyrightComponent } from '@chengzi-tools/copyright';
import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import { HeadingComponent } from '@chengzi-tools/heading';
import { PencilIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import ConfirmDialogComponent from './components/confirm-dialog';
import { ContextMenuComponent } from './components/context-menu';
import { DashboardComponent } from './components/dashboard';
import EditorDialogComponent from './components/editor-dialog';
import { MenuAction, MenuContext, MenuContextValue } from './constants/context-menu';
import { DialogContext, DialogContextValue } from './constants/dialog-context';
import type { Item } from './states';

export default () => {

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  const [isEditorDialogVisible, setIsEditorDialogVisible] = useState(false);
  const [focusedItem, setFocusedItem] = useState<Item | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const menuContextValue: MenuContextValue = {
    openContextMenu: (event, item) => {
      event.preventDefault();
      setIsContextMenuVisible(true);
      setCursorPosition({ x: event.clientX, y: event.clientY });
      setFocusedItem(item);
    },
  };

  const dialogContextValue: DialogContextValue = {
    openConfirmDialog: item => setIsDeleteDialogVisible(true),
    openEditorDialog: item => {
      item && setFocusedItem(item as Item);
      setIsEditorDialogVisible(true);
    },
  };

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [menuActions] = useState<MenuAction[]>([
    { icon: <PencilIcon className="w-5 h-5" />, title: '编辑短语', onClick: () => setIsEditorDialogVisible(true) },
    { icon: <TrashIcon className="w-5 h-5" />, title: '删除短语', onClick: () => setIsDeleteDialogVisible(true) },
    { icon: <QuestionMarkCircleIcon className="w-5 h-5" />, title: '查看帮助' },
  ]);

  return <>

    <MenuContext.Provider value={menuContextValue}>
      <DialogContext.Provider value={dialogContextValue}>
        <AppContainerComponent
          onContextMenu={e => e.preventDefault()}
          onClick={() => setIsContextMenuVisible(false)}
        >
          <HeadingComponent title="客服话术" />
          <DashboardComponent />
          <FlexGrowComponent />
          <CopyrightComponent />
        </AppContainerComponent>
      </DialogContext.Provider>
    </MenuContext.Provider>

    <ContextMenuComponent
      actions={menuActions}
      cursorPosition={cursorPosition}
      isVisible={isContextMenuVisible}
      setVisible={setIsContextMenuVisible}
    />
    {
      focusedItem && <>
        <ConfirmDialogComponent
          item={focusedItem}
          isVisible={isDeleteDialogVisible}
          setIsVisible={setIsDeleteDialogVisible}
        />
        <EditorDialogComponent
          item={focusedItem}
          isVisible={isEditorDialogVisible}
          setIsVisible={setIsEditorDialogVisible}
        />
      </>
    }

  </>;

};
