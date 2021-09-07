import { HTMLAttributes, ReactNode } from 'react';
import tw from 'tailwind-styled-components';

export type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
}

const StyledAppContainer = tw.div`
  flex
  flex-col
  min-h-screen
`;

export const AppContainerComponent = ({ children, ...rest }: Props) =>
  <StyledAppContainer {...rest}>{children}</StyledAppContainer>;
