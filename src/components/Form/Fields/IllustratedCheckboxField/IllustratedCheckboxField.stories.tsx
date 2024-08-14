import { useState } from 'react';

import Icon from 'components/Icon';

import { IllustratedCheckboxField } from '.';

export default {
  title: 'Form fields/IllustratedCheckboxField',
  component: IllustratedCheckboxField,
};

export const illustratedCheckboxField = () => {
  const [is1Checked, setIs1Checked] = useState(false);
  const [is2Checked, setIs2Checked] = useState(false);

  return (
    <>
      <IllustratedCheckboxField
        title="Checkbox field"
        subtitle="Chocolate gummi bears oat cake sweet roll macaroon marshmallow. Croissant lemon drops bonbon macaroon soufflé sesame snaps halvah croissant chocolate bar. Liquorice cotton candy candy sugar plum dragée. Gummi bears topping cake jujubes lemon drops danish jujubes. "
        id="some-id-1"
        isChecked={is1Checked}
        onChange={setIs1Checked}
        icon={<Icon src="/purchased-electricity.svg" alt="" size={80} />}
      />
      <IllustratedCheckboxField
        title="Checkbox field"
        subtitle="Chocolate gummi bears oat cake sweet roll macaroon marshmallow. Croissant lemon drops bonbon macaroon soufflé sesame snaps halvah croissant chocolate bar. Liquorice cotton candy candy sugar plum dragée. Gummi bears topping cake jujubes lemon drops danish jujubes. "
        id="some-id-2"
        isChecked={is2Checked}
        onChange={setIs2Checked}
        icon={<Icon src="/stationary-mobile-combustion.svg" alt="" size={80} />}
      />
    </>
  );
};
