import styled from 'styled-components';

const StyledCopyright = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1rem;
`;

export const CopyrightComponent = () => <StyledCopyright className="siimple-footer siimple-footer--light">
  <p>版权所有 © <strong>小橙子</strong> 2021+</p>
</StyledCopyright>;
