import { CSSProperties, ReactNode } from 'react';
import tw from 'tailwind-styled-components';

export interface Props {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const StyledAppContainer = tw.div`
  flex
  flex-col
  min-h-screen
`;

export const AppContainerComponent = ({ className, style, children }: Props) =>
  <StyledAppContainer {...{ className, style }}>{children}</StyledAppContainer>;
