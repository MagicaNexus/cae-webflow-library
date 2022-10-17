import { attrElement } from 'src';

const textInput = (function () {
  // Accordion Settings
  const settings = {
    attribute: {
      field: `[${attrElement}="text-input-field"]`,
      counter: `[${attrElement}="text-input-counter-label"]`,
      component: `[${attrElement}="text-input-field-component"]`,
      passwordIcon: `[${attrElement}="text-input-field-password-icon"]`,
      max: `maxlength`,
      type: 'type',
      password: 'password',
      fieldType: 'field-type',
    },
    icon: {
      eyeOpen: '',
      eyeClose: '',
    },
  };

  const attributes = settings.attribute;
  const icons = settings.icon;

  return {
    init: function () {
      document.querySelectorAll(attributes.field).forEach((trigger) => {
        const textfield: HTMLInputElement = trigger as HTMLInputElement;
        const component: HTMLDivElement | null = textfield.closest(attributes.component);

        if (!component) return;

        // Show the number of characters in an input
        if (textfield.getAttribute(attributes.fieldType) === 'counter') {
          const counterLabel: HTMLTextAreaElement = component.querySelector(
            attributes.counter
          ) as HTMLTextAreaElement;

          //Get the char limit from the attribute
          const limit = Number(textfield.getAttribute(attributes.max));

          //Initialize the text of the limit
          counterLabel.textContent = '0/' + limit;

          //Set the text on keyup
          textfield.addEventListener('keyup', () => {
            counterLabel.textContent = textfield.value.length + '/' + limit;
          });
        }

        //Show the password show/hide behaviour
        if (textfield.getAttribute(attributes.type) === attributes.password) {
          const passwordIcon: HTMLTextAreaElement = component.querySelector(
            attributes.passwordIcon
          ) as HTMLTextAreaElement;

          //Initialize the field state
          let passwordState = true;

          //On click password icon
          passwordIcon.addEventListener('click', onClickPasswordIcon);

          function onClickPasswordIcon() {
            passwordIcon.textContent = passwordState ? icons.eyeOpen : icons.eyeClose;
            textfield.setAttribute(attributes.type, passwordState ? 'text' : attributes.password);
            passwordState = !passwordState;
          }
        }
      });
    },
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  textInput.init();
});
