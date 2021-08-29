import { HeadingComponent } from '@chengzi-tools/heading';
import styled from 'styled-components';
import DashboardComponent from './components/dashboard';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1rem;
`;

export default () => <StyledApp>
  <HeadingComponent title="客服话术" />
  <DashboardComponent />
</StyledApp>;
