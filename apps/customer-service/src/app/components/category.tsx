import { CheckIcon, DocumentAddIcon, PencilIcon } from '@heroicons/react/outline';
import { useContext, useState } from 'react';
import tw from 'tailwind-styled-components';
import { DialogContext } from '../constants/dialog-context';
import { Category, useCategoryUpdate } from '../states';
import { useItems } from '../states/items';
import { ItemComponent, StyledItem } from './item';

const StyledContainer = tw.div`
  w-full md:max-w-sm
  px-2 py-4
  shadow
  rounded
  transition
  hover:shadow-lg
`;

const StyledHeadingContainer = tw.div`
  flex flex-row justify-between items-center
  group
  w-full mb-4
  text-gray-600
`;

const StyledHeading = tw.div`
  flex-grow flex-shrink-0
  font-bold text-xl text-center
  group-hover:text-gray-900
  ${props => props.contentEditable ? 'ring-2' : ''}
`;

const StyledHeadingButton = tw.button`
  h-5 w-5 ml-2
  transition
  opacity-0 group-hover:opacity-100
  group-hover:text-gray-900
`;

const StyledList = tw.ul`
  flex flex-col
  space-y-px
`;

type Props = Category;

export const CategoryComponent = (category: Props) => {

  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState<Category>(category);
  const [heading, setHeading] = useState<HTMLHeadingElement>();

  const items = useItems();
  const { openEditorDialog } = useContext(DialogContext);
  const update = useCategoryUpdate();

  return <StyledContainer>
    <StyledHeadingContainer>
      <StyledHeading
        ref={element => setHeading(element)}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={({ currentTarget: target }) => setNewCategory({ ...newCategory, name: target.innerText })}
        onKeyDown={({ code, currentTarget: target }) => {
          if (code.toLowerCase() !== 'enter') { return; }
          setIsEditing(false);
          update({ ...newCategory, name: target.innerText });
        }}
      >
        {newCategory.name}
      </StyledHeading>
      <StyledHeadingButton className={isEditing ? 'opacity-100' : ''} onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? <CheckIcon onClick={() => update(newCategory)} /> : <PencilIcon onClick={() => setTimeout(() => heading?.focus(), 0)} />}
      </StyledHeadingButton>
    </StyledHeadingContainer>
    <StyledList>
      {
        items
          .filter(item => item.category === category.id)
          .sort((a, b) => b.frequency - a.frequency)
          .map(item => <ItemComponent key={item.id} {...item} />)
      }
      <StyledItem className="cursor-pointer" onClick={() => openEditorDialog({ category: category.id })}>
        <DocumentAddIcon className="w-5 h-5" />
        <span className="ml-1">点击添加常用短语</span>
      </StyledItem>
    </StyledList>
  </StyledContainer>;

};

export default CategoryComponent;
