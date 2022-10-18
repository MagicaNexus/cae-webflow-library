import { settings } from '$global/settings';

const segmentedControl = (function () {
  const { classes } = settings;
  const attribute = settings.attributes.segmented_control;

  return {
    init: function () {
      document.querySelectorAll(attribute).forEach((trigger) => {
        const triggerElement: HTMLElement = trigger as HTMLElement;

        //Disable the animation when component has a "disabled" class
        if (triggerElement.classList.contains(classes.disabled)) {
          triggerElement.style.pointerEvents = classes.none;
          return;
        }
        //On click component
        triggerElement.addEventListener('click', activate);

        function activate() {
          //Get all options in the segmented option component
          const parent: ParentNode | null = triggerElement.parentNode;
          if (parent == null) return;
          const children: NodeListOf<Element> = parent.querySelectorAll(attribute);

          //Desactivate all the options then activate the option triggered in the parent node
          children.forEach((target) => target.classList.remove(classes.active));
          triggerElement.closest(attribute)?.classList.add(classes.active);
        }
      });
    },
  };
})();

// Initialize the component
segmentedControl.init();
