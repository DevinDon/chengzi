import { AppContainerComponent } from '@chengzi-tools/app-container';
import { CopyrightComponent } from '@chengzi-tools/copyright';
import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import { HeadingComponent } from '@chengzi-tools/heading';
import { DashboardComponent } from './components/dashboard';

export default () => <AppContainerComponent>
  <HeadingComponent title="客服话术" />

  <DashboardComponent />

  <FlexGrowComponent />

  <CopyrightComponent />
</AppContainerComponent>;
