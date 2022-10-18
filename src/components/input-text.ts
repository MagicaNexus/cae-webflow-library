import { settings } from '$global/settings';

const textInput = (function () {
  const { global } = settings.attributes;
  const { icons } = settings;
  const attributes = settings.attributes.input_text;

  return {
    init: function () {
      document.querySelectorAll(attributes.field).forEach((trigger) => {
        const textfield: HTMLInputElement = trigger as HTMLInputElement;
        const component: HTMLDivElement | null = textfield.closest(attributes.component);

        if (!component) return;

        // Show the number of characters in an input
        if (textfield.getAttribute(global.fieldType) === 'counter') {
          const counterLabel: HTMLTextAreaElement = component.querySelector(
            attributes.label
          ) as HTMLTextAreaElement;

          //Get the char limit from the attribute
          const limit = Number(textfield.getAttribute('maxlength'));

          //Initialize the text of the limit
          counterLabel.textContent = '0/' + limit;

          //Set the text on keyup
          textfield.addEventListener('keyup', () => {
            counterLabel.textContent = textfield.value.length + '/' + limit;
          });
        }

        //Show the password show/hide behaviour
        if (textfield.getAttribute('type') === 'password') {
          const icon: HTMLTextAreaElement | null = component.querySelector(attributes.icon);

          if (!icon) return;

          //Initialize the field state
          let passwordState = true;

          //On click password icon
          icon.addEventListener('click', function () {
            icon.textContent = passwordState ? icons.show_outline : icons.show_solid;
            textfield.setAttribute('type', passwordState ? 'text' : 'password');
            passwordState = !passwordState;
          });
        }
      });
    },
  };
})();

// Initialize the component
textInput.init();
