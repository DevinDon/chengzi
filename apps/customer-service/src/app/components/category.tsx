import styled from 'styled-components';
import type { Category } from '../states';
import ItemComponent from './item';

type Props = Category;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;

  margin: 0 1rem;
  padding: 0;
`;

const StyledHeading = styled.h3`
  width: 100%;
  text-align: center;
`;

export default ({ name, items }: Props) => <div>
  <StyledHeading className="siimple-h3">{name}</StyledHeading>
  <StyledList className="siimple-list siimple-list--hover">
    {
      items
        .sort((a, b) => b.frequency - a.frequency)
        .map(item => <ItemComponent key={item.id} {...item} />)
    }
  </StyledList>
</div>;
