import { useCallback, useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { Item } from '../states';

type Props = Item;

// list item
export const StyledItem = tw.li`
  flex flex-row
  justify-center items-center
  relative
  overflow-hidden
  w-full
  px-4 py-2
  rounded-sm
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
  text-sm
  text-white
  text-center
  font-bold
  bg-yellow-500
  w-8
`;

// item copied
const StyledItemCopied = tw(StyledItemBasedContainer)`
  justify-center
  cursor-not-allowed
  bg-green-500 text-white
`;

export const ItemComponent = ({ id, content, category, frequency }: Props) => {

  const [isCopied, setIsCopied] = useState(false);
  const copy = useCallback(() => {
    if (isCopied === true) { return; }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  }, [isCopied]);

  return <StyledItem title={content}>

    <span>&nbsp;</span>

    <StyledItemContainer className={`${isCopied ? '-translate-y-16' : ''}`} onClick={copy}>
      <StyledItemText>{content}</StyledItemText>
      <StyledItemBadge>
        {frequency > 999 ? Math.trunc(frequency / 1000) + 'k+' : frequency}
      </StyledItemBadge>
    </StyledItemContainer>

    <StyledItemCopied className={`${isCopied ? '' : 'translate-y-16'}`}><span>已复制</span></StyledItemCopied>

  </StyledItem>;
};

export default ItemComponent;
