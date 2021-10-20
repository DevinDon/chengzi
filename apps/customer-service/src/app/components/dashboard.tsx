import tw from 'tailwind-styled-components';
import { Category, useCategories } from '../states';
import { CategoryComponent, UncategoryComponent } from './category';

const StyledDashboard = tw.div`
  flex flex-row flex-wrap
  justify-around items-start
  p-4
`;

export const DashboardComponent = () => {

  const categories: Category[] = useCategories();

  return <StyledDashboard>
    <UncategoryComponent />
    {
      categories
        .sort((a, b) => a.id - b.id)
        .map(category => <CategoryComponent key={category.name} {...category} />)
    }
  </StyledDashboard>;
};

export default DashboardComponent;
