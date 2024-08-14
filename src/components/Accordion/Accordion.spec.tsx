import { render, fireEvent } from '@testing-library/react';
import Accordion from '.';

describe('Accordion', () => {
  it('should render collapsed as default - no visible content', () => {
    const { getByTestId } = render(
      <Accordion title="Mock Title" content="Mock Content" />
    );

    const accordionContent = getByTestId('accordion-content');
    expect(accordionContent).not.toBeVisible();
  });

  it('should display content when accordion btn is toggled', () => {
    const { getByTestId } = render(
      <Accordion title="Mock Title" content="Mock Content" />
    );
    const accordionBtn = getByTestId('accordion-toggle-btn');
    expect(accordionBtn).toBeVisible();

    fireEvent.click(accordionBtn);
    const accordionContent = getByTestId('accordion-content');
    expect(accordionContent).toBeVisible();
  });

  it('should hide visible content when accordion btn is toggled', () => {
    const { getByTestId } = render(
      <Accordion title="Mock Title" content="Mock Content" />
    );
    const accordionBtn = getByTestId('accordion-toggle-btn');
    expect(accordionBtn).toBeVisible();

    fireEvent.click(accordionBtn);
    const accordionContent = getByTestId('accordion-content');
    expect(accordionContent).toBeVisible();

    fireEvent.click(accordionBtn);
    expect(accordionContent).not.toBeVisible();
  });
});
