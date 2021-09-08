import { AppContainerComponent } from '@chengzi-tools/app-container';
import { CopyrightComponent } from '@chengzi-tools/copyright';
import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import { HeadingComponent } from '@chengzi-tools/heading';
import { useState } from 'react';
import ConfirmDialogComponent from './components/confirm-dialog';
import { ContextMenuComponent } from './components/context-menu';
import { DashboardComponent } from './components/dashboard';
import { DEFAULT_MENU_ACTIONS, MenuAction, MenuContext, MenuContextValue } from './constants/context-menu';

export default () => {

  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
  const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [menuActions, setMenuActions] = useState<MenuAction[]>(DEFAULT_MENU_ACTIONS);

  const openContextMenu: MenuContextValue['openContextMenu'] = (event, id) => {
    event.preventDefault();
    setContextMenuVisible(true);
    setCursorPosition({ x: event.clientX, y: event.clientY });
  };

  return <>
    <MenuContext.Provider value={{ openContextMenu }}>
      <AppContainerComponent
        onContextMenu={e => e.preventDefault()}
        onClick={() => setContextMenuVisible(false)}
      >
        <HeadingComponent title="客服话术" />
        <button onClick={() => setDeleteDialogVisible(!isDeleteDialogVisible)}>测试</button>
        <DashboardComponent />

        <FlexGrowComponent />

        <CopyrightComponent />

      </AppContainerComponent>
    </MenuContext.Provider>
    <ContextMenuComponent actions={menuActions} cursorPosition={cursorPosition} isVisible={isContextMenuVisible} setVisible={setContextMenuVisible} />
    <ConfirmDialogComponent
      item={{ id: '1', frequency: 0, content: '亲，您好，小电商家专线，我是追追，很高兴为您服务~', category: '问候语' }}
      isVisible={isDeleteDialogVisible}
      setIsVisible={setDeleteDialogVisible} />
  </>;

};
