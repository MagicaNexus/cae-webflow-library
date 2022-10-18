const attrElement = 'co-element';

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
};

const globalAttributes = {
  global: {
    co_element: 'co-element',
    fieldType: 'co-type',
    min: `co-min`,
    max: `co-max`,
  },
  accordion: {
    toogle: `[${attrElement}="accordion-toogle"]`,
    icon: `[${attrElement}="accordion-icon"]`,
    component: `[${attrElement}="accordion-item"]`,
  },
  input_number: {
    component: `[${attrElement}="input-number"]`,
    input: `[${attrElement}="input-number-field"]`,
    minus: `[${attrElement}="input-number-minus"]`,
    plus: `[${attrElement}="input-number-plus"]`,
  },
  input_text: {
    field: `[${attrElement}="text-input-field"]`,
    label: `[${attrElement}="text-input-counter-label"]`,
    component: `[${attrElement}="text-input-field-component"]`,
    icon: `[${attrElement}="text-input-field-password-icon"]`,
  },
  segmented_control: `[${attrElement}="segmented-control"]`,
  tooltip: `[${attrElement}="tooltip"]`,
};

export const settings = {
  attributes: globalAttributes,
  classes: globalClasses,
  icons: globalIcons,
};
