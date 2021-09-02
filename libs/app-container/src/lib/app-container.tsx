import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

export interface Props {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  min-height: calc(100vh - 2rem);
`;

export const AppContainerComponent = ({ className, style, children }: Props) =>
  <StyledAppContainer {...{ className, style }}>{children}</StyledAppContainer>;
