import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

export interface Props {
  style?: CSSProperties;
  children: ReactNode;
}

const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  min-height: calc(100vh - 2rem);
`;

export const AppContainerComponent = ({ style, children }: Props) =>
  <StyledAppContainer style={style}>{children}</StyledAppContainer>;
