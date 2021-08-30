import { useState } from 'react';
import styled from 'styled-components';
import type { Category } from '../states';
import { useItemInsert, useItems } from '../states/items';
import { EditorComponent } from './dialog/editor';
import { ItemComponent } from './item';

type Props = Category;

const StyledContainer = styled.div``;

const StyledHeading = styled.h3`
  width: 100%;
  text-align: center;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;

  margin: 0;
  padding: 0;
`;

const StyledItemInsert = styled.li`
  width: 300px;
`;

export const CategoryComponent = ({ name }: Props) => {

  const [isInserting, setIsInserting] = useState(false);

  const items = useItems();
  const insert = useItemInsert();

  return <StyledContainer>
    <StyledHeading className="siimple-h3">
      <small className="siimple">{name}</small>
    </StyledHeading>
    <StyledList className="siimple-list siimple-list--hover">
      {
        items
          .filter(item => item.category === name)
          .sort((a, b) => b.frequency - a.frequency)
          .map(item => <ItemComponent key={item.id} {...item} />)
      }
      <StyledItemInsert className="siimple-list-item" onClick={() => setIsInserting(true)}>
        <span role="img" aria-label="add">➕</span> 点击添加常用短语
      </StyledItemInsert>
    </StyledList>
    {
      isInserting && <EditorComponent
        content=""
        confirm={(text: string) => {
          insert({ id: Date.now().toString(), content: text, category: name, frequency: 0 });
          setIsInserting(false);
        }}
        cancel={() => {
          setIsInserting(false);
        }}
      />
    }
  </StyledContainer>;

};

export default CategoryComponent;
