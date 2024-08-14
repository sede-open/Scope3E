import { render } from '@testing-library/react';
import { AlizarinCrimson, Gray } from 'styles/colours';

import CharacterCounter from '.';

describe('CharacterCounter', () => {
  it('should output the set max character number minus length of the value', () => {
    const value = 'some fake value';
    const { getByTestId } = render(
      <CharacterCounter max={500} value={value.length} />
    );
    const characterCounter = getByTestId('character-counter');
    expect(characterCounter.textContent).toContain('485');
  });

  it('should should show error state if value length is equal to the set max characters', () => {
    const { getByTestId } = render(<CharacterCounter max={500} value={500} />);
    const characterCounter = getByTestId('character-counter');
    expect(characterCounter).toHaveStyle(`color: ${AlizarinCrimson}`);
  });

  it('should should not show error state if value length is less than set max characters', () => {
    const { getByTestId } = render(<CharacterCounter max={500} value={100} />);
    const characterCounter = getByTestId('character-counter');
    expect(characterCounter).toHaveStyle(`color: ${Gray}`);
  });
});
