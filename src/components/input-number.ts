import { attrElement } from 'src';

const inputNumber = (function () {
  // Input Number Component settings
  const settings = {
    attribute: {
      component: `[${attrElement}="input-number"]`,
      input: `[${attrElement}="input-number-field"]`,
      minus: `[${attrElement}="input-number-minus"]`,
      plus: `[${attrElement}="input-number-plus"]`,
      min: `co-input-number-min`,
      max: `co-input-number-max`,
    },
    class: {
      disabled: 'disabled',
      none: 'none',
      active: 'active',
      auto: 'auto',
      ghost: 'ghost',
      ghost_disabled: 'ghost-disabled',
    },
  };

  const classes = settings.class;
  const attributes = settings.attribute;

  return {
    init: function () {
      document.querySelectorAll(attributes.input).forEach((trigger) => {
        const triggerElement: HTMLInputElement = trigger as HTMLInputElement;
        const component: HTMLElement = triggerElement.closest(attributes.component) as HTMLElement;

        triggerElement.value = triggerElement.getAttribute('placeholder') || '0';

        //Disable the animation when component has a "disabled" class
        if (component.classList.contains(classes.disabled)) {
          component.style.pointerEvents = classes.none;
          return;
        }

        let plusButton: HTMLDivElement = document.createElement('div');
        let minusButton: HTMLDivElement = document.createElement('div');

        component.childNodes.forEach((child) => {
          const button: HTMLDivElement = child as HTMLDivElement;
          if (button.getAttribute(attrElement) === 'input-number-minus') {
            minusButton = button;
          }

          if (button.getAttribute(attrElement) === 'input-number-plus') {
            plusButton = button;
          }
        });

        component.childNodes.forEach((child) => {
          const button: HTMLDivElement = child as HTMLDivElement;
          button.addEventListener('click', setInputNumberButton);

          function setInputNumberButton() {
            const inputValue = Number(triggerElement.value);
            enableButton(minusButton);
            enableButton(plusButton);

            if (button.getAttribute(attrElement) === 'input-number-minus') {
              triggerElement.value = (inputValue - 1).toString();
              if (hasLimitValue(triggerElement, attributes.min)) disableButton(button);

              /*
              if (!triggerElement.hasAttribute(attributes.min)) return;
              const minValue = Number(triggerElement.getAttribute(attributes.min));
              if (isNaN(minValue) || inputValue - 1 !== minValue) return;
              disableButton(minusButton);*/
            }

            if (button.getAttribute(attrElement) === 'input-number-plus') {
              triggerElement.value = (inputValue + 1).toString();

              if (!triggerElement.hasAttribute(attributes.max)) return;
              const maxValue = Number(triggerElement.getAttribute(attributes.max));
              if (isNaN(maxValue) || inputValue + 1 !== maxValue) return;
              disableButton(plusButton);
            }
          }

          function disableButton(button: HTMLDivElement) {
            button.classList.remove(classes.ghost);
            button.classList.add(classes.ghost_disabled);
            button.style.pointerEvents = classes.none;
          }

          function enableButton(button: HTMLDivElement) {
            button.classList.remove(classes.ghost_disabled);
            button.classList.add(classes.ghost);
            button.style.pointerEvents = classes.auto;
          }

          function hasLimitValue(triggerElement: HTMLInputElement, attribute: string) {
            if (!triggerElement.hasAttribute(attribute)) return false;
            const minValue = Number(triggerElement.getAttribute(attribute));
            return !(isNaN(minValue) || Number(triggerElement.value) !== minValue);
          }
        });
      });
    },
  };
})();

//Initialize segmented control components when page is loaded
document.addEventListener('DOMContentLoaded', () => {
  inputNumber.init();
});
