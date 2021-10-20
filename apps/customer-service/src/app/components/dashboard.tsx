import tw from 'tailwind-styled-components';
import { Category, useCategories } from '../states';
import { CategoryComponent, CreateCategoryComponent, UncategoryComponent } from './category';
import styled from 'styled-components';

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

    > div {
      transform:rotateX(180deg);
    }
`;

const StyledDashboard = tw.div`
  flex flex-row
  justify-around items-start
  p-4 space-x-4
  w-max
`;

export const DashboardComponent = () => {

  const categories: Category[] = useCategories();

  return <StyledContainer>
    <StyledDashboard>
      <UncategoryComponent />
      {
        categories
          .sort((a, b) => a.id - b.id)
          .map(category => <CategoryComponent key={category.name} {...category} />)
      }
      <CreateCategoryComponent />
    </StyledDashboard>
  </StyledContainer>;
};

export default DashboardComponent;
