import { fireEvent, render, screen } from '@testing-library/react';
import { FC, useRef } from 'react';

import { useFocusTrap } from './focusTrap';

describe('useFocusTrap', () => {
  // set readonly for test purpose
  const TestComponent: FC<{ readonly isEnabled: boolean }> = ({
    isEnabled,
  }) => {
    const ref = useRef(null);
    useFocusTrap(ref, isEnabled);

    return (
      <section>
        <section ref={ref}>
          <label htmlFor="input">
            Input 1
            <input id="input" type="text" />
          </label>
          <label htmlFor="input2">
            Input 2
            <input id="input2" type="text" />
          </label>
        </section>

        <label htmlFor="outer-input">
          Outer input
          <input id="outer-input" type="text" />
        </label>
      </section>
    );
  };

  it('should focus first item on tab leading outside of component', async () => {
    render(<TestComponent isEnabled />);

    const input = screen.getByRole('textbox', { name: 'Input 1' });
    const input2 = screen.getByRole('textbox', { name: 'Input 2' });

    input2.focus();
    fireEvent.keyDown(document, { key: 'Tab' });

    expect(input).toHaveFocus();

    input.focus();
    fireEvent.keyDown(document, { key: 'Tab' });

    // Jest doesn't change focus on tab, so nothing should change
    expect(input).toHaveFocus();
  });

  it('should focus last item on shift+tab leading outside of component', async () => {
    render(<TestComponent isEnabled />);

    const input = screen.getByRole('textbox', { name: 'Input 1' });
    const input2 = screen.getByRole('textbox', { name: 'Input 2' });

    input.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

    expect(input2).toHaveFocus();

    input2.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

    // Jest doesn't change focus on tab, so nothing should change
    expect(input2).toHaveFocus();
  });

  it('should not do anything on non-tab key press', () => {
    render(<TestComponent isEnabled />);

    const input = screen.getByRole('textbox', { name: 'Input 1' });

    input.focus();
    fireEvent.keyDown(document, { key: 'Enter' });

    expect(input).toHaveFocus();
  });

  it('should not do anything on tab if no focusable elements', () => {
    const TestComponentWithoutFocusableElements: FC = () => {
      const ref = useRef(null);
      useFocusTrap(ref, true);

      return (
        <section>
          <section ref={ref}>
            <div>Content</div>
          </section>

          <label htmlFor="outer-input">
            Outer input
            <input id="outer-input" type="text" />
          </label>
        </section>
      );
    };

    render(<TestComponentWithoutFocusableElements />);
    const outerInput = screen.getByRole('textbox', { name: 'Outer input' });

    outerInput.focus();
    fireEvent.keyDown(document, { key: 'Tab' });

    expect(outerInput).toHaveFocus();
  });

  it('should not do anything on tab if no ref is set', () => {
    const TestComponentWithoutRefSet: FC = () => {
      const ref = useRef(null);
      useFocusTrap(ref, true);

      return (
        <section>
          <section>
            <label htmlFor="input">
              Input 1
              <input id="input" type="text" />
            </label>
            <label htmlFor="input2">
              Input 2
              <input id="input2" type="text" />
            </label>
          </section>

          <label htmlFor="outer-input">
            Outer input
            <input id="outer-input" type="text" />
          </label>
        </section>
      );
    };

    render(<TestComponentWithoutRefSet />);
    const input = screen.getByRole('textbox', { name: 'Input 1' });

    input.focus();
    fireEvent.keyDown(document, { key: 'Tab' });

    expect(input).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

    expect(input).toHaveFocus();
  });

  it('should not do anything on focusout if new target is inside modal', () => {
    render(<TestComponent isEnabled />);
    const input = screen.getByRole('textbox', { name: 'Input 1' });
    const input2 = screen.getByRole('textbox', { name: 'Input 2' });

    input.focus();
    fireEvent.focusOut(document, { relatedTarget: input2 });

    expect(input).toHaveFocus();
  });

  it('should focus first focusable element on focusout', () => {
    render(<TestComponent isEnabled />);
    const input = screen.getByRole('textbox', { name: 'Input 1' });
    const input2 = screen.getByRole('textbox', { name: 'Input 2' });
    const outerInput = screen.getByRole('textbox', { name: 'Outer input' });

    input2.focus();
    fireEvent.focusOut(document, { relatedTarget: outerInput });

    expect(input).toHaveFocus();
  });

  it('should not do anything on focusout if no focusable elements', () => {
    const TestComponentWithoutFocusableElements: FC = () => {
      const ref = useRef(null);
      useFocusTrap(ref, true);

      return (
        <section>
          <section ref={ref}>
            <label htmlFor="input">
              Input 1
              <input id="input" tabIndex={-1} type="text" />
            </label>
          </section>

          <label htmlFor="outer-input">
            Outer input
            <input id="outer-input" type="text" />
          </label>
        </section>
      );
    };

    render(<TestComponentWithoutFocusableElements />);
    const input = screen.getByRole('textbox', { name: 'Input 1' });
    const outerInput = screen.getByRole('textbox', { name: 'Outer input' });

    input.focus();
    fireEvent.focusOut(document, { relatedTarget: outerInput });

    expect(input).toHaveFocus();
  });

  it('should not do anything if it is not enabled', () => {
    render(<TestComponent isEnabled={false} />);
    const input = screen.getByRole('textbox', { name: 'Input 1' });
    const outerInput = screen.getByRole('textbox', { name: 'Outer input' });

    outerInput.focus();
    fireEvent.keyDown(document, { key: 'Tab' });

    expect(outerInput).toHaveFocus();

    fireEvent.focusOut(document, { relatedTarget: input });

    expect(outerInput).toHaveFocus();
  });
});
