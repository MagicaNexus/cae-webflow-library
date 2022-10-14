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

        if (triggerElement.hasAttribute(attributes.min)) console.log('Min');

        if (triggerElement.hasAttribute(attributes.max)) console.log('Max');

        component.childNodes.forEach((child) => {
          const button: HTMLElement = child as HTMLElement;
          button.addEventListener('click', setInputNumberButton);

          function setInputNumberButton() {
            const inputValue = Number(triggerElement.value);

            if (button.getAttribute(attrElement) === 'input-number-minus') {
              triggerElement.value = (inputValue - 1).toString();
              if (!triggerElement.hasAttribute(attributes.min)) return;
            }

            if (button.getAttribute(attrElement) === 'input-number-plus') {
              triggerElement.value = (inputValue + 1).toString();
              if (!triggerElement.hasAttribute(attributes.max)) return;
              const maxValue = Number(triggerElement.getAttribute(attributes.max));
              if (isNaN(maxValue) || inputValue + 1 !== maxValue) return;
            }
          }

          function disableButton(button: HTMLElement) {
            button.classList.remove(classes.ghost);
            button.classList.add(classes.ghost_disabled);
            button.style.pointerEvents = classes.none;
          }

          function enableButton(button: HTMLElement) {
            button.classList.remove(classes.ghost_disabled);
            button.classList.add(classes.ghost);
            button.style.pointerEvents = classes.auto;
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
