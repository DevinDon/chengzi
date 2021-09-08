import { render } from '@testing-library/react';

import FullModal from './full-modal';

describe('FullModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FullModal />);
    expect(baseElement).toBeTruthy();
  });
});
