const coElementAttr = 'co-element';
const coIconAttr = 'co-icon';
const coButtonAttr = 'co-button';
const coTriggerAttr = 'co-trigger';
export let isLocal = false;

export function setIsLocal(value: boolean) {
  isLocal = value;
}

const globalComponents = {
  tooltip: 'tooltip',
  accordion: 'accordion',
  inputNumber: 'input-number',
  segmentedControl: 'segmented-control',
  textInput: 'text-input',
  chip: 'chip',
  flagMessage: 'flag-message',
  banner: 'banner',
};

const globalClasses = {
  active: 'active',
  disabled: 'disabled',
  none: 'none',
  auto: 'auto',
  ghost: 'ghost',
  ghost_disabled: 'ghost-disabled',
  scrollbar: 'scrollbar',
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
    co_trigger: coTriggerAttr,
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
    hide: `[${coButtonAttr}="hide"]`,
  },
  flag_message: {
    component: `[${coElementAttr}="${globalComponents.flagMessage}"]`,
    hide: `[${coButtonAttr}="hide"]`,
  },
  banner: {
    component: `[${coElementAttr}="${globalComponents.banner}"]`,
    hide: `[${coButtonAttr}="hide"]`,
  },
};

export const settings = {
  attributes: globalAttributes,
  classes: globalClasses,
  icons: globalIcons,
  components: globalComponents,
};
