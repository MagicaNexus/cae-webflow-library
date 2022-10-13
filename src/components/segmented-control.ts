const segmentedControl = (function () {
  // Segmented Control Component settings
  const settings = {
    attribute: '[cobalt-element="segmented-control"]',
    classes: {
      disabled: 'disabled',
      none: 'none',
      active: 'active',
    },
  };

  const prefix = settings.classes;

  return {
    init: function () {
      document.querySelectorAll(settings.attribute).forEach((trigger) => {
        const triggerElement: HTMLElement = trigger as HTMLElement;

        //Disable the animation when component has a "disabled" class
        if (triggerElement.classList.contains(prefix.disabled)) {
          triggerElement.style.pointerEvents = prefix.none;
          return;
        }
        //On click component
        triggerElement.addEventListener('click', activate);

        function activate() {
          //Get all options in the segmented option component
          const parent: ParentNode | null = triggerElement.parentNode;
          if (parent == null) return;
          const children: NodeListOf<Element> = parent.querySelectorAll(settings.attribute);

          //Desactivate all the options then activate the option triggered in the parent node
          children.forEach((target) => target.classList.remove(prefix.active));
          triggerElement.closest(settings.attribute)?.classList.add(prefix.active);
        }
      });
    },
  };
})();

//Initialize segmented control components when page is loaded
document.addEventListener('DOMContentLoaded', () => {
  segmentedControl.init();
});
