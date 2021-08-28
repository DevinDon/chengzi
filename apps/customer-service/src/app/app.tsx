import styled from 'styled-components';
import DashboardComponent from './components/dashboard';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default () => {

  return <StyledApp>
    <h1 className="siimple-h1">客服话术</h1>
    <h2 className="siimple-h2 siimple--color-warning">小橙子专属</h2>

    <DashboardComponent />
  </StyledApp>;

};
