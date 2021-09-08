import { FullModalWithTransitionComponent } from '@chengzi-tools/full-modal';
import { Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import type { MenuAction } from '../constants/context-menu';

const StyledMenu = tw.div`
  flex flex-col
  shadow
  w-full h-auto
  py-2
  bg-white
  rounded-t
  space-y-px
  fixed top-0 left-0 z-10

  md:max-w-xs
  md:rounded-b
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
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  cursorPosition: {
    x: number;
    y: number;
  };
  actions: MenuAction[];
};

export const ContextMenuComponent = ({ actions, cursorPosition, isVisible, setVisible }: Props) => {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size] = useState({ width: 320, height: actions.length * 40 + (actions.length - 1) + 2 * 8 });

  useEffect(() => {
    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight;
    const menuWidth = size.width;
    const menuHeight = size.height;
    if (deviceWidth < 1.5 * menuWidth) {
      const x = 0;
      const y = deviceHeight - menuHeight;
      setPosition({ x, y });
    } else {
      const x = deviceWidth - cursorPosition.x > menuWidth
        ? cursorPosition.x
        : cursorPosition.x - menuWidth;
      const y = deviceHeight - cursorPosition.y > menuHeight
        ? cursorPosition.y
        : cursorPosition.y - menuHeight;
      setPosition({ x, y });
      console.log({ deviceWidth, deviceHeight, menuWidth, menuHeight, cursorPosition, x, y });
    }
  }, [size, cursorPosition]);

  return <>
    <FullModalWithTransitionComponent
      isVisible={isVisible}
      onContextMenu={e => e.preventDefault()}
      onClick={() => setVisible(false)}
    />
    <Transition
      as={Fragment}
      show={isVisible}
      enter="transform transition duration-300 ease-out origin-bottom md:origin-top-left"
      enterFrom="translate-y-48 md:scale-0"
      enterTo="translate-y-0 md:scale-100"
      leave="transform transition duration-200 ease-in origin-bottom md:origin-top-left"
      leaveFrom="translate-y-0 md:scale-100"
      leaveTo="translate-y-48 md:scale-0"
    >
      <StyledMenu style={{ top: position.y, left: position.x }}>
        {
          actions.map(
            ({ icon, title, onClick }) =>
              <StyledMenuItem key={title} onClick={() => {
                onClick && onClick();
                setVisible(false);
              }}>
                {icon || <QuestionMarkCircleIcon className="w-5 h-5" />}
                <span className="ml-2">{title}</span>
              </StyledMenuItem>
          )
        }
      </StyledMenu>
    </Transition>
  </>;

};

export default ContextMenuComponent;
