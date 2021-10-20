import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import { CategoriesProvider, ItemsProvider } from './states';

describe('App', () => {

  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <CategoriesProvider>
          <ItemsProvider>
            <App />,
          </ItemsProvider>
        </CategoriesProvider>
      </BrowserRouter>,
    );

    expect(baseElement).toBeTruthy();
  });

  it('should have title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CategoriesProvider>
          <ItemsProvider>
            <App />,
          </ItemsProvider>
        </CategoriesProvider>
      </BrowserRouter>,
    );

    expect(getByText('客服话术')).toBeTruthy();
    expect(getByText('小橙子专属')).toBeTruthy();
  });

});
