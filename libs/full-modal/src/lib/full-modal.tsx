import { Transition } from '@headlessui/react';
import { Fragment, HTMLAttributes, ReactNode } from 'react';
import tw from 'tailwind-styled-components';

type Props = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

type PropsWithTransition = Props & {
  isVisible: boolean;
};

export const StyledModal = tw.div`
  flex flex-col justify-center items-center
  fixed top-0 left-0
  w-screen h-screen

  bg-black bg-opacity-50
  md:bg-opacity-0
`;

export const FullModalComponent = ({ children, ...rest }: Props) =>
  <StyledModal {...rest}>{children}</StyledModal>;

export const FullModalWithTransitionComponent = ({ children, isVisible, ...rest }: PropsWithTransition) =>
  <Transition
    as={Fragment}
    show={isVisible}
    enter="transition-opacity ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <StyledModal {...rest}>{children}</StyledModal>
  </Transition>;
