import { HeadingComponent } from '@chengzi-tools/heading';
import styled from 'styled-components';
import customerServiceCover from '../assets/customer-service-cover.png';
import orderFormatterCover from '../assets/order-formatter-cover.png';
import CardComponent from './components/card';

const StyledApp = styled.div`
  padding: 1rem;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  margin: 2rem 0;
  padding: 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

export default () => <StyledApp>
  <HeadingComponent title="小橙子的工具箱" />

  <StyledList>
    <CardComponent title="客服话术">
      <a href="./customer-service/">
        <StyledImage src={customerServiceCover} alt="点击前往客服话术工具页面" title="点击前往客服话术工具页面" />
      </a>
    </CardComponent>

    <CardComponent title="订单格式化">
      <a href="./order-formatter/">
        <StyledImage src={orderFormatterCover} alt="点击前往订单格式化工具页面" title="点击前往订单格式化工具页面" />
      </a>
    </CardComponent>
  </StyledList>
</StyledApp>;
