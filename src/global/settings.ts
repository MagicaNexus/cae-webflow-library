const coElementAttr = 'co-element';
const coIconAttr = 'co-icon';
const coButtonAttr = 'co-button';

const globalComponents = {
  tooltip: 'tooltip',
  accordion: 'accordion',
  inputNumber: 'input-number',
  segmentedControl: 'segmented-control',
  textInput: 'text-input',
  chip: 'chip',
};

const globalClasses = {
  active: 'active',
  disabled: 'disabled',
  none: 'none',
  auto: 'auto',
  ghost: 'ghost',
  ghost_disabled: 'ghost-disabled',
};

const globalIcons = {
  show_outline: '',
  show_solid: '',
  close_outline: '',
  close_solid: '',
};

const globalAttributes = {
  global: {
    co_element: coElementAttr,
    co_icon: coIconAttr,
    co_button: coButtonAttr,
    fieldType: 'co-type',
    min: `co-min`,
    max: `co-max`,
  },
  accordion: {
    component: `[${coElementAttr}="${globalComponents.accordion}"]`,
    toogle: `[${coElementAttr}="accordion-toogle"]`,
    icon: `[${coElementAttr}="accordion-icon"]`,
  },
  input_number: {
    component: `[${coElementAttr}="${globalComponents.inputNumber}"]`,
    input: `[${coElementAttr}="input-number-field"]`,
    minus: `[${coElementAttr}="input-number-minus"]`,
    plus: `[${coElementAttr}="input-number-plus"]`,
  },
  input_text: {
    field: `[${coElementAttr}="${globalComponents.textInput}"]`,
    label: `[${coElementAttr}="text-input-counter-label"]`,
    component: `[${coElementAttr}="text-input-field-component"]`,
    icon: `[${coElementAttr}="text-input-field-password-icon"]`,
  },
  segmented_control: `[${coElementAttr}="${globalComponents.segmentedControl}"]`,
  tooltip: `[${coElementAttr}="${globalComponents.tooltip}"]`,
  chip: {
    component: `[${coElementAttr}="${globalComponents.chip}"]`,
    list: `[${coElementAttr}="chip-list"]`,
    icon: `[${coButtonAttr}="remove-chip"]`,
  },
};

export const settings = {
  attributes: globalAttributes,
  classes: globalClasses,
  icons: globalIcons,
  components: globalComponents,
};
