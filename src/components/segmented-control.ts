import { attrElement } from 'src';

const segmentedControl = (function () {
  // Segmented Control Component settings
  const settings = {
    attribute: {
      segmented: `[${attrElement}="segmented-control"]`,
    },
    class: {
      disabled: 'disabled',
      none: 'none',
      active: 'active',
    },
  };

  const classes = settings.class;
  const attributes = settings.attribute;

  return {
    init: function () {
      document.querySelectorAll(attributes.segmented).forEach((trigger) => {
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
          const children: NodeListOf<Element> = parent.querySelectorAll(attributes.segmented);

          //Desactivate all the options then activate the option triggered in the parent node
          children.forEach((target) => target.classList.remove(classes.active));
          triggerElement.closest(attributes.segmented)?.classList.add(classes.active);
        }
      });
    },
  };
})();

//Initialize segmented control components when page is loaded
document.addEventListener('DOMContentLoaded', () => {
  segmentedControl.init();
});
