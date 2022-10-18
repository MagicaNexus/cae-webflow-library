import { settings } from '$global/settings';

const inputNumber = (function () {
  const { classes } = settings;
  const { global } = settings.attributes;
  const attributes = settings.attributes.input_number;

  return {
    init: function () {
      document.querySelectorAll(attributes.input).forEach((trigger) => {
        const triggerElement: HTMLInputElement = trigger as HTMLInputElement; // The input field
        const component: HTMLElement = triggerElement.closest(attributes.component) as HTMLElement; // the whole component

        // Set the value of the field with the placeholder value - if NAN, return 0
        triggerElement.value = triggerElement.getAttribute('placeholder') || '0';

        //Disable the animation when component has a "disabled" class
        if (component.classList.contains(classes.disabled)) {
          component.style.pointerEvents = classes.none;
          return;
        }

        //Get the plus and minus buttons
        let plusButton: HTMLDivElement = document.createElement('div');
        let minusButton: HTMLDivElement = document.createElement('div');
        component.childNodes.forEach((child) => {
          const button: HTMLDivElement = child as HTMLDivElement;
          if (button.getAttribute(global.co_element) === 'input-number-minus') minusButton = button;

          if (button.getAttribute(global.co_element) === 'input-number-plus') plusButton = button;
        });

        component.childNodes.forEach((child) => {
          const button: HTMLDivElement = child as HTMLDivElement;
          button.addEventListener('click', setInputNumberButton);

          function setInputNumberButton() {
            const inputValue = Number(triggerElement.value);
            //Enable all the buttons
            enableButton(minusButton);
            enableButton(plusButton);

            //Add or substract one digit on click plus or minus
            if (button.getAttribute(global.co_element) === 'input-number-minus') {
              triggerElement.value = (inputValue - 1).toString();
              if (hasLimitValue(triggerElement, global.min)) disableButton(button);
            }

            if (button.getAttribute(global.co_element) === 'input-number-plus') {
              triggerElement.value = (inputValue + 1).toString();
              if (hasLimitValue(triggerElement, global.max)) disableButton(button);
            }
          }

          //Disable a button by setting the ghost-disabled class
          function disableButton(button: HTMLDivElement) {
            button.classList.remove(classes.ghost);
            button.classList.add(classes.ghost_disabled);
            button.style.pointerEvents = classes.none;
          }

          //Enable a button by setting the ghost class
          function enableButton(button: HTMLDivElement) {
            button.classList.remove(classes.ghost_disabled);
            button.classList.add(classes.ghost);
            button.style.pointerEvents = classes.auto;
          }

          // Check if it has a min or max value
          function hasLimitValue(triggerElement: HTMLInputElement, attribute: string) {
            if (!triggerElement.hasAttribute(attribute)) return false;
            const limitValue = Number(triggerElement.getAttribute(attribute));
            return !(isNaN(limitValue) || Number(triggerElement.value) !== limitValue);
          }
        });
      });
    },
  };
})();

// Initialize the component
inputNumber.init();
