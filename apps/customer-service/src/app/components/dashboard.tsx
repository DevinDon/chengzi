import { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { useCategories, useCategorySelectAll, useItems, useItemSelectAll } from '../states';
import { CategoryComponent, CreateCategoryComponent, UncategoryComponent } from './category';

const StyledContainer = styled.div`
    ::-webkit-scrollbar {
      width: 0;
      height: .2rem;
    }

    ::-webkit-scrollbar-track {
      background-color: #ffffff00;
      border-radius: .2rem;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: .2rem;
      background-clip: content-box;
      background-color: #f59e0b;
    }

    scroll-behavior: smooth;
    overflow: scroll;
    transform:rotateX(180deg);
    padding: 1rem;

    > div {
      transform:rotateX(180deg);
    }
`;

const StyledDashboard = tw.div`
  flex flex-col justify-center items-center
  md:flex-row md:justify-around md:items-start
  w-full
  md:w-max
  space-y-4
  md:space-y-0 md:space-x-4
`;

export const DashboardComponent = () => {

  const categories = useCategories();
  const items = useItems();

  const fetchAllCategories = useCategorySelectAll();
  const fetchAllItems = useItemSelectAll();

  useEffect(() => {
    fetchAllCategories();
    fetchAllItems();
  }, [fetchAllCategories, fetchAllItems]);

  return <StyledContainer>
    <StyledDashboard>
      {items.filter(item => item.categoryId === null).length ? <UncategoryComponent /> : undefined}
      {
        categories
          .sort((a, b) => a.id - b.id)
          .map(category => <CategoryComponent key={category.id} {...category} />)
      }
      <CreateCategoryComponent />
    </StyledDashboard>
  </StyledContainer>;
};

export default DashboardComponent;
