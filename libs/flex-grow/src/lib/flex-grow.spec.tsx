import { render } from '@testing-library/react';

import FlexGrow from './flex-grow';

describe('FlexGrow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlexGrow />);
    expect(baseElement).toBeTruthy();
  });
});
