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
  md:fixed md:top-0 md:left-0 md:z-10

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
}

export const ContextMenuComponent = ({ actions, cursorPosition, isVisible, setVisible }: Props) => {

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size] = useState({ width: 320, height: actions.length * 40 + (actions.length - 1) + 2 * 8 });
  const getOrigin = () => cursorPosition.x === position.x ? 'md:origin-top-left' : 'md:origin-top-right';

  useEffect(() => {
    const deviceWidth = window.innerWidth;
    const deviceHeight = window.innerHeight;
    const menuWidth = size.width;
    const menuHeight = size.height;
    if (deviceWidth < 1.5 * menuWidth) { return; }
    const x = deviceWidth - cursorPosition.x > menuWidth
      ? cursorPosition.x
      : cursorPosition.x - menuWidth;
    const y = deviceHeight - cursorPosition.y > menuHeight
      ? cursorPosition.y
      : cursorPosition.y - menuHeight;
    setPosition({ x, y });
  }, [size, cursorPosition]);

  return <FullModalWithTransitionComponent
    isVisible={isVisible}
    onContextMenu={e => e.preventDefault()}
    onClick={() => setVisible(false)}
  >
    <Transition.Child
      as={Fragment}
      enter={`transform transition duration-300 ease-out origin-bottom ${getOrigin()}`}
      enterFrom="translate-y-48 md:translate-y-0 md:scale-0"
      enterTo="translate-y-0 md:scale-100"
      leave={`transform transition duration-200 ease-out origin-bottom ${getOrigin()}`}
      leaveFrom="translate-y-0 md:scale-100"
      leaveTo="translate-y-48 md:translate-y-0 md:scale-0"
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
              </StyledMenuItem>,
          )
        }
      </StyledMenu>
    </Transition.Child>
  </FullModalWithTransitionComponent>;

};

export default ContextMenuComponent;
