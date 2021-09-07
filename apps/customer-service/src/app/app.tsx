import { AppContainerComponent } from '@chengzi-tools/app-container';
import { CopyrightComponent } from '@chengzi-tools/copyright';
import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import { HeadingComponent } from '@chengzi-tools/heading';
import { useState } from 'react';
import { ContextMenuComponent } from './components/context-menu';
import { DashboardComponent } from './components/dashboard';
import { DEFAULT_MENU_ACTIONS, MenuAction, MenuContext, MenuContextValue } from './constants/context-menu';

export default () => {

  const [isContextMenuVisible, setContextMenuVisible] = useState(false);
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

        <DashboardComponent />

        <FlexGrowComponent />

        <CopyrightComponent />

      </AppContainerComponent>
    </MenuContext.Provider>
    <ContextMenuComponent actions={menuActions} cursorPosition={cursorPosition} isVisible={isContextMenuVisible} setVisible={setContextMenuVisible} />

  </>;

};
