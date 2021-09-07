import { Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import type { MenuAction } from '../constants/context-menu';

const StyledModal = tw.div`
  fixed top-0 left-0
  w-screen h-screen
  bg-black bg-opacity-50
`;

const StyledMenu = tw.div`
  flex flex-col
  shadow
  w-full h-auto
  md:max-w-xs
  py-2
  bg-white
  rounded
  space-y-px
  fixed top-0 left-0 z-10
`;

const StyledMenuItem = tw.button`
  flex flex-row justify-start items-center
  w-full
  px-4 py-2
  bg-white
  transition
  hover:bg-yellow-500 hover:text-white
`;

interface Props {
  isVisable: boolean;
  setVisable: (isVisable: boolean) => void;
  cursorPosition: {
    x: number;
    y: number;
  };
  actions: MenuAction[];
};

export const ContextMenuComponent = ({ actions, cursorPosition, isVisable, setVisable }: Props) => {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size] = useState({ width: 320, height: actions.length * 40 + (actions.length - 1) + 2 * 8 });

  useEffect(() => {
    const x = window.screen.width - cursorPosition.x > size.width
      ? cursorPosition.x
      : cursorPosition.x - size.width;
    const y = window.screen.height - cursorPosition.y > size.height
      ? cursorPosition.y
      : cursorPosition.y - size.height;
    setPosition({ x, y });
  }, [size, cursorPosition]);

  return <Transition
    show={isVisable}
    enter="transition-opacity ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <StyledModal onContextMenu={e => e.preventDefault()} onClick={() => setVisable(false)} />
    <StyledMenu style={{ top: position.y, left: position.x }}>
      {
        actions.map(
          ({ icon, title, onClick }) =>
            <StyledMenuItem key={title} onClick={() => {
              onClick && onClick();
              setVisable(false);
            }}>
              {icon || <QuestionMarkCircleIcon className="w-5 h-5" />}
              <span className="ml-2">{title}</span>
            </StyledMenuItem>
        )
      }
    </StyledMenu>
  </Transition>;

};

export default ContextMenuComponent;
