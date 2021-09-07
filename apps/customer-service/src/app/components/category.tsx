import tw from 'tailwind-styled-components';
import type { Category } from '../states';
import { useItems } from '../states/items';
import { ItemComponent, StyledItem } from './item';

type Props = Category;

const StyledContainer = tw.div`
  w-full md:max-w-sm
  px-2 py-4
  shadow
  rounded
  transition
  hover:shadow-lg
`;

const StyledHeading = tw.h3`
  w-full
  text-center
  font-bold text-xl text-gray-600
  mb-4
`;

const StyledList = tw.ul`
  flex
  flex-col
  space-y-px
`;

export const CategoryComponent = ({ name }: Props) => {

  const items = useItems();

  return <StyledContainer>
    <StyledHeading>{name}</StyledHeading>
    <StyledList>
      {
        items
          .filter(item => item.category === name)
          .sort((a, b) => b.frequency - a.frequency)
          .map(item => <ItemComponent key={item.id} {...item} />)
      }
      <StyledItem className="cursor-pointer">
        <span role="img" aria-label="add">➕</span> 点击添加常用短语
      </StyledItem>
    </StyledList>
  </StyledContainer>;

};

export default CategoryComponent;
