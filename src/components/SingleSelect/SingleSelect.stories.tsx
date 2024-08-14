import { SingleSelect } from '.';

export default {
  title: 'SingleSelect',
  component: SingleSelect,
};

const colourOptions = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'blue', label: 'Blue' },
];

const flavourOptions = [
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'salted-caramel', label: 'Salted Caramel' },
];

const groupedOptions = [
  {
    label: 'Colours',
    options: colourOptions,
  },
  {
    label: 'Flavours',
    options: flavourOptions,
  },
];

export const Default = () => (
  <SingleSelect
    inputId=""
    maxMenuHeight={250}
    name="name"
    options={flavourOptions}
    placeholder="Please select an option"
    value={undefined}
  />
);

export const GroupedOptions = () => (
  <SingleSelect
    inputId=""
    maxMenuHeight={250}
    name="name"
    options={groupedOptions}
    placeholder="Please select an option"
    value={undefined}
  />
);
