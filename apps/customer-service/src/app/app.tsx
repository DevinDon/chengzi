import styled from 'styled-components';
import DashboardComponent from './components/dashboard';
import { data } from './data';

const StyledApp = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

export default () => <StyledApp>
  <h1 className="siimple-h1">客服话术</h1>
  <h2 className="siimple-h2 siimple--color-warning">小橙子专属</h2>

  <DashboardComponent categories={data} />
</StyledApp>;
