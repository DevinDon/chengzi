import styled from 'styled-components';
import { Category, useCategories } from '../states';
import CategoryComponent from './category';

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;

  width: 100%;
`;

export default () => {

  const categories: Category[] = useCategories();

  return <StyledDashboard>
    {
      categories
        .sort((a, b) => a.id - b.id)
        .map(category => <CategoryComponent key={category.name} {...category} />)
    }
  </StyledDashboard>;
};
