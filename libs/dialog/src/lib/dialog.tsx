import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import tw from 'tailwind-styled-components';

const StyledDialog = tw.div`
  w-full h-auto
  flex flex-col
  shadow rounded-t
  bg-white
  p-4 space-y-4
  md:rounded-b
  md:max-w-sm
`;

const StyledDialogTitle = tw.div`
  font-bold text-lg
`;

const StyledDialogContent = tw.div`
`;

const StyledDialogActions = tw.div`
  flex flex-row justify-around items-center
`;

const StyledBasedButton = tw.button`
  inline-flex items-center
  px-8 py-2
  border border-transparent
  text-base font-medium
  shadow rounded-md
  hover:shadow-lg
  focus:outline-none focus:ring-2 focus:ring-offset-2
  transition
`;

const StyledDialogCancelButton = tw(StyledBasedButton)`
  border-gray-300
  text-gray-700 bg-white
  hover:bg-gray-50 focus:ring-yellow-300
`;

const StyledDialogConfirmButton = tw(StyledBasedButton)`
  border-yellow-400
  text-yellow-700 bg-yellow-200
  hover:bg-yellow-300 focus:ring-yellow-500
`;

type Props = HTMLAttributes<HTMLDivElement> & {
  title: string;
  children: ReactNode;
  actions: {
    confirm: () => void;
    cancel: () => void;
  };
};

export const DialogComponent = forwardRef<HTMLDivElement, Props>(
  ({ title, children, actions }: Props, ref) => {

    return <StyledDialog ref={ref} onClick={event => event.stopPropagation()}>
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogContent>{children}</StyledDialogContent>
      <StyledDialogActions>
        <StyledDialogCancelButton onClick={actions.cancel}>取消</StyledDialogCancelButton>
        <StyledDialogConfirmButton onClick={actions.confirm}>确定</StyledDialogConfirmButton>
      </StyledDialogActions>
    </StyledDialog>;
  },
);

export default DialogComponent;
