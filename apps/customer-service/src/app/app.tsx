import { AppContainerComponent } from '@chengzi-tools/app-container';
import { CopyrightComponent } from '@chengzi-tools/copyright';
import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import { HeadingComponent } from '@chengzi-tools/heading';
import { useState } from 'react';
import { DashboardComponent } from './components/dashboard';

export default () => {

  const [isContextVisible, setContextVisible] = useState(false);

  return <AppContainerComponent
    onContextMenu={e => {
      e.preventDefault();
      setContextVisible(true);
    }}
    onClick={() => setContextVisible(false)}
  >
    <HeadingComponent title="客服话术" />

    <DashboardComponent />

    <FlexGrowComponent />

    <CopyrightComponent />
  </AppContainerComponent>;

};
