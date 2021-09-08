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

  const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [isEditorDialogVisible, setEditorDialogVisible] = useState(true);
  const [focusedItem, setFocusedItem] = useState<Item>({ category: '问候语' } as Item);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const menuContextValue: MenuContextValue = {
    openContextMenu: (event, item) => {
      event.preventDefault();
      setContextMenuVisible(true);
      setCursorPosition({ x: event.clientX, y: event.clientY });
      setFocusedItem(item);
    },
  }

  const dialogContextValue: DialogContextValue = {
    openConfirmDialog: () => setDeleteDialogVisible(true),
    openEditorDialog: () => setEditorDialogVisible(true),
  };

  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [menuActions, setMenuActions] = useState<MenuAction[]>([
    { icon: <PencilIcon className="w-5 h-5" />, title: '编辑短语', onClick: dialogContextValue.openEditorDialog },
    { icon: <TrashIcon className="w-5 h-5" />, title: '删除短语', onClick: dialogContextValue.openConfirmDialog },
    { icon: <QuestionMarkCircleIcon className="w-5 h-5" />, title: '查看帮助' },
  ]);

  return <>

    <MenuContext.Provider value={menuContextValue}>
      <DialogContext.Provider value={dialogContextValue}>
        <AppContainerComponent
          onContextMenu={e => e.preventDefault()}
          onClick={() => setContextMenuVisible(false)}
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
      setVisible={setContextMenuVisible}
    />
    <ConfirmDialogComponent
      item={focusedItem}
      isVisible={isDeleteDialogVisible}
      setIsVisible={setDeleteDialogVisible}
    />
    <EditorDialogComponent
      item={focusedItem}
      isVisible={isEditorDialogVisible}
      setIsVisible={setEditorDialogVisible}
    />

  </>;

};
