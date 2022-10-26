const coElementAttr = 'co-element';
const coIconAttr = 'co-icon';
const coButtonAttr = 'co-button';
const coTriggerAttr = 'co-trigger';
const coToggleAttr = 'co-toggle';
const coBelongingAttr = 'co-belonging';
export let isLocal = false;

export function setIsLocal(value: boolean) {
  isLocal = value;
}

const globalComponents = {
  accordion: 'accordion',
  background: 'background',
  banner: 'banner',
  chip: 'chip',
  inputNumber: 'input-number',
  flagMessage: 'flag-message',
  modal: 'modal',
  segmentedControl: 'segmented-control',
  sideNavigation: 'side-navigation',
  textInput: 'text-input',
  tooltip: 'tooltip',
};

const globalClasses = {
  active: 'active',
  disabled: 'disabled',
  none: 'none',
  auto: 'auto',
  ghost: 'ghost',
  ghost_disabled: 'ghost-disabled',
  scrollbar: 'scrollbar',
  hide: 'hide',
  open: 'open',
  close: 'close',
  lightMode: 'light-mode',
  darkMode: 'dark-mode',
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
    co_toggle: coToggleAttr,
    co_belonging: coBelongingAttr,
    fieldType: 'co-type',
    min: `co-min`,
    max: `co-max`,
    toggleOn: `on`,
    toggleOff: `off`,
    lightMode: `[${coToggleAttr}="${globalClasses.lightMode}"]`,
    darkMode: `[${coToggleAttr}="${globalClasses.darkMode}"]`,
  },
  accordion: {
    component: `[${coElementAttr}="${globalComponents.accordion}"]`,
    toggle: `[${coElementAttr}="accordion-toggle"]`,
    icon: `[${coElementAttr}="accordion-icon"]`,
    body: `[${coElementAttr}="accordion-body"]`,
    belonging: `[${coBelongingAttr}="${globalComponents.sideNavigation}"]`,
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
  background: `[${coElementAttr}="${globalComponents.background}"]`,
  tooltip: `[${coElementAttr}="${globalComponents.tooltip}"]`,
  chip: {
    component: `[${coElementAttr}="${globalComponents.chip}"]`,
    list: `[${coElementAttr}="list"]`,
    hide: `[${coButtonAttr}="hide"]`,
  },
  flag_message: {
    component: `[${coElementAttr}="${globalComponents.flagMessage}"]`,
    hide: `[${coButtonAttr}="hide"]`,
  },
  modal: {
    component: `[${coElementAttr}="${globalComponents.modal}"]`,
    hide: `[${coButtonAttr}="hide"]`,
  },
  banner: {
    component: `[${coElementAttr}="${globalComponents.banner}"]`,
    hide: `[${coButtonAttr}="hide"]`,
  },
  sideNavigation: {
    component: `[${coElementAttr}="${globalComponents.sideNavigation}"]`,
    backing: `[${coElementAttr}="side-navigation-backing"]`,
    icon: `[${coElementAttr}="side-navigation-icon"]`,
    navButton: `[${coToggleAttr}="navbar"]`,
  },
};

export const settings = {
  attributes: globalAttributes,
  classes: globalClasses,
  icons: globalIcons,
  components: globalComponents,
};
