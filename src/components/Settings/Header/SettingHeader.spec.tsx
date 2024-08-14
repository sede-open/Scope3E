import { render } from '@testing-library/react';
import { SettingHeader } from '.';

describe('Setting Header', () => {
  describe('when initalised', () => {
    it('should render with title, back text and data test id', () => {
      const backButtonText = 'back button text';
      const title = 'title text';
      const dataTestId = 'test-id';
      const { getByText } = render(
        <SettingHeader
          backNavigationText={backButtonText}
          title={title}
          dataTestIdPrefix={dataTestId}
        />
      );
      expect(getByText(title)).toBeInTheDocument();
      expect(getByText(backButtonText)).toBeInTheDocument();
    });
  });
});
