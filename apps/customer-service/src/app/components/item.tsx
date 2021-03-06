import * as Clipboard from 'clipboard-polyfill';
import { useCallback, useContext, useState } from 'react';
import { useTimeoutFn } from 'react-use';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { MenuContext } from '../constants/context-menu';
import { Item, useItemFrequencyIncrease } from '../states';

type Props = Item;

// list item
export const StyledItem = tw.li`
  flex flex-row justify-center items-center
  relative
  overflow-hidden
  w-full
  px-4 py-2
  rounded-sm
  select-none
  transition
  hover:shadow
  bg-gray-100
  hover:bg-gray-200
`;

const StyledItemBasedContainer = tw(
  styled.div`
    height: inherit;
    width: inherit;
    box-sizing: inherit;
    padding: inherit;
  `,
)`
  flex flex-row items-center
  absolute top-0 left-0

  transition transform
  duration-300
`;

// item container
const StyledItemContainer = tw(StyledItemBasedContainer)`
  justify-between
  cursor-pointer
`;

// item text
const StyledItemText = tw.span`
  inline-block
  truncate
`;

// item badge
const StyledItemBadge = tw.span`
  flex-shrink-0
  rounded-3xl
  text-xs
  text-white
  text-center
  font-bold
  bg-yellow-500
  w-8 ml-1
`;

// item copied
const StyledItemCopied = tw(StyledItemBasedContainer)`
  justify-center
  cursor-not-allowed
  bg-green-500 text-white
`;

// item copy failed
const StyledItemCopyFailed = tw(StyledItemBasedContainer)`
  justify-center
  cursor-not-allowed
  bg-red-500 text-white
`;

export const ItemComponent = ({ id, content, categoryId, frequency }: Props) => {

  const { openContextMenu } = useContext(MenuContext);
  const increase = useItemFrequencyIncrease();

  const [isCopied, setIsCopied] = useState(false);
  const [isCopyFailed, setIsCopyFailed] = useState(false);
  const [, , resetTimeout] = useTimeoutFn(() => {
    setIsCopied(false);
    setIsCopyFailed(false);
  }, 2500);

  const copy = useCallback(() => {
    if ((isCopied || isCopyFailed) === true) { return; }
    Clipboard
      .writeText(content)
      .then(() => {
        setIsCopied(true);
        resetTimeout();
        increase(id);
      })
      .catch(() => {
        setIsCopyFailed(true);
        resetTimeout();
      });
  }, [resetTimeout, increase, id, content, isCopied, isCopyFailed]);

  return <StyledItem title={content}>

    <span>&nbsp;</span>

    <StyledItemContainer
      className={`${isCopied ? '-translate-y-16' : ''}`}
      onClick={copy}
      onContextMenu={event => openContextMenu(event, { id, content, categoryId, frequency })}
    >
      <StyledItemText>{content}</StyledItemText>
      <StyledItemBadge>
        {frequency > 999 ? Math.trunc(frequency / 1000) + 'k+' : frequency}
      </StyledItemBadge>
    </StyledItemContainer>

    <StyledItemCopied className={`${isCopied ? 'translate-y-0' : 'translate-y-16'}`}><span>?????????</span></StyledItemCopied>

    <StyledItemCopyFailed className={`${isCopyFailed ? 'translate-y-0' : 'translate-y-16'}`}><span>????????????</span></StyledItemCopyFailed>

  </StyledItem>;
};

export default ItemComponent;
