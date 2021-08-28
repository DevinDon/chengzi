import styled from 'styled-components';
import type { Category } from '../states';
import CategoryComponent from './category';

interface Props {
  categories: Category[];
}

const StyledDashboard = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
flex-wrap: wrap;

width: 100%;
`;

export default ({ categories }: Props) => <StyledDashboard>
  {
    categories
      .sort((a, b) => a.order - b.order)
      .map(category => <CategoryComponent key={category.id} {...category} />)
  }
</StyledDashboard>;
