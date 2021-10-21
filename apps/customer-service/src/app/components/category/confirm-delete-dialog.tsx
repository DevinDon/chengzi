import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import tw from 'tailwind-styled-components';

const StyledDialogContainer = tw.div`
  flex flex-col
  shadow
  w-full
  p-4 space-y-4
  bg-white
  rounded-t
  space-y-4
  md:fixed md:bottom-0 md:left-0 md:z-10

  overflow-hidden text-left align-middle
  transition-all transform
  md:max-w-xs
  md:rounded-b
`;

const StyledBasedButton = tw.button`
  inline-flex justify-center items-center
  px-4 py-2
  border border-transparent
  text-sm font-medium
  shadow-sm rounded-md
  hover:shadow
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
  text-yellow-700 bg-yellow-100
  hover:bg-yellow-200 focus:ring-yellow-500
`;

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  content: string;
  confirm: (setIsOpen: (isOpen: boolean) => void) => void;
};

export const ConfirmDeleteDialog = ({ isOpen, setIsOpen, title, content, confirm }: Props) => {

  return <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-hidden"
      onClose={() => setIsOpen(false)}
    >
      <div className="min-h-screen text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="inline-block h-screen align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <StyledDialogContainer>
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {title}
            </Dialog.Title>
            <p className="text-sm text-gray-500">{content}</p>

            <div className="flex flex-row justify-around items-center">
              <StyledDialogCancelButton onClick={() => setIsOpen(false)}>
                取消
              </StyledDialogCancelButton>
              <StyledDialogConfirmButton onClick={() => confirm(setIsOpen)}>
                确认
              </StyledDialogConfirmButton>
            </div>
          </StyledDialogContainer>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>;

};

export default ConfirmDeleteDialog;
