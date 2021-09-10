import { AppContainerComponent } from '@chengzi-tools/app-container';
import { CopyrightComponent } from '@chengzi-tools/copyright';
import { FlexGrowComponent } from '@chengzi-tools/flex-grow';
import { HeadingComponent } from '@chengzi-tools/heading';
import tw from 'tailwind-styled-components';
import customerServiceCover from '../assets/customer-service-cover.png';
import orderFormatterCover from '../assets/order-formatter-cover.png';
import workingCover from '../assets/working-cover.png';
import { CardComponent } from './components/card';

const StyledList = tw.ul`
  flex
  flex-row
  justify-around
  items-center
  flex-wrap

  md:p-4
  lg:space-x-2
`;

export default () => <AppContainerComponent>
  <HeadingComponent title="小橙子的工具箱" />

  <StyledList>
    <CardComponent title="客服话术" link="customer-service.devin.red" image={customerServiceCover} />
    <CardComponent title="订单格式化" link="order-formatter.devin.red" image={orderFormatterCover} />
    <CardComponent className="cursor-not-allowed" title="正在施工中" image={workingCover} />
  </StyledList>

  <FlexGrowComponent />

  <CopyrightComponent />
</AppContainerComponent>;
