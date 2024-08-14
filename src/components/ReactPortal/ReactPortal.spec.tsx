import { render } from '@testing-library/react';
import { ReactPortal } from '.';

describe('React Portal', () => {
  it('appends the element when the component is mounted', async () => {
    const childElement = 'child-element';
    const portalElement = 'portal-element';

    const targetElement = document.createElement('div');
    const portalChildElement = document.createElement('div');

    portalChildElement.setAttribute('id', portalElement);
    document.body.append(targetElement);
    targetElement.appendChild(portalChildElement);

    render(
      <ReactPortal targetNode={targetElement}>
        <div id={childElement} />
      </ReactPortal>
    );

    const childElementId = document.getElementById(childElement);
    expect(targetElement).toContainElement(childElementId);

    const portalElementId = document.getElementById(portalElement);
    expect(targetElement).toContainElement(portalElementId);

    expect(targetElement).toContainHTML(
      '<div id="portal-element"></div><div id="child-element"></div>'
    );
  });
});
