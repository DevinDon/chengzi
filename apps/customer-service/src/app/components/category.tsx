import { CheckIcon, DocumentAddIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { useCallback, useContext, useState } from 'react';
import tw from 'tailwind-styled-components';
import { DialogContext } from '../constants/dialog-context';
import { Category, useCategoryInsert, useCategoryRemove, useCategoryUpdate } from '../states';
import { useItems, useSetItems } from '../states/items';
import { ItemComponent, StyledItem } from './item';

const StyledContainer = tw.div`
  w-full md:max-w-sm md:w-96
  px-2 py-4
  shadow
  rounded
  transition
  hover:shadow-lg
`;

const StyledHeadingContainer = tw.div`
  flex flex-row justify-center items-center
  group
  w-full mb-4
  text-gray-600
`;

const StyledHeading = tw.div`
  font-bold text-xl
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
  const setItems = useSetItems();
  const { openEditorDialog } = useContext(DialogContext);
  const update = useCategoryUpdate();
  const remove = useCategoryRemove();

  const removeCategory = useCallback(
    () => {
      remove(category.id);
      setItems(prev => {
        const affectedItems = prev.filter(item => item.categoryId === category.id);
        return affectedItems.map(item => ({ ...item, categoryId: null }));
      });
    },
    [category.id, remove, setItems],
  );

  return <StyledContainer>
    <StyledHeadingContainer>
      <StyledHeadingButton className="cursor-default" />
      <StyledHeadingButton className="cursor-default" />
      <StyledHeading
        ref={element => setHeading(element)}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={({ currentTarget: target }) => setNewCategory({ ...newCategory, name: target.innerText })}
        onKeyDown={({ code, currentTarget: target }) => {
          if (code.toLowerCase() !== 'enter') { return; }
          setIsEditing(false);
          update(category.id, { name: target.innerText });
        }}
      >
        {newCategory.name}
      </StyledHeading>
      <StyledHeadingButton className={isEditing ? 'opacity-100' : ''} onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? <CheckIcon onClick={() => update(category.id, newCategory)} /> : <PencilIcon onClick={() => setTimeout(() => heading?.focus(), 0)} />}
      </StyledHeadingButton>
      <StyledHeadingButton className={isEditing ? 'opacity-100' : ''} onClick={removeCategory}>
        <TrashIcon />
      </StyledHeadingButton>
    </StyledHeadingContainer>
    <StyledList>
      {
        items
          .filter(item => item.categoryId === category.id)
          .sort((a, b) => b.frequency - a.frequency)
          .map(item => <ItemComponent key={item.id} {...item} />)
      }
      <StyledItem className="cursor-pointer" onClick={() => openEditorDialog({ categoryId: category.id })}>
        <DocumentAddIcon className="w-5 h-5" />
        <span className="ml-1">点击添加常用短语</span>
      </StyledItem>
    </StyledList>
  </StyledContainer>;

};

export const UncategoryComponent = () => {

  const items = useItems();
  const { openEditorDialog } = useContext(DialogContext);

  return <StyledContainer>
    <StyledHeadingContainer>
      <StyledHeading>未分类</StyledHeading>
    </StyledHeadingContainer>
    <StyledList>
      {
        items
          .filter(item => item.categoryId === null)
          .sort((a, b) => b.frequency - a.frequency)
          .map(item => <ItemComponent key={item.id} {...item} />)
      }
      <StyledItem className="cursor-pointer" onClick={() => openEditorDialog({ categoryId: null })}>
        <DocumentAddIcon className="w-5 h-5" />
        <span className="ml-1">点击添加未分类短语</span>
      </StyledItem>
    </StyledList>
  </StyledContainer>;
};

export const CreateCategoryComponent = () => {
  const insert = useCategoryInsert();
  return <StyledContainer>
    <StyledHeadingContainer>
      <StyledHeading>创建新分类</StyledHeading>
    </StyledHeadingContainer>
    <StyledList className="h-48 justify-center">
      <StyledItem className="cursor-pointer flex-grow" onClick={() => insert({ name: '新分类' })}>
        <DocumentAddIcon className="w-5 h-5" />
        <span className="ml-1">点击创建新分类</span>
      </StyledItem>
    </StyledList>
  </StyledContainer>;
};

export default CategoryComponent;
