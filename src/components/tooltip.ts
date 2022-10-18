import tippy from 'tippy.js';

import { settings } from '$global/settings';
import '$styles/tooltip.css';

const tooltip = (function () {
  const attribute = settings.attributes.tooltip;

  return {
    init: function () {
      tippy(attribute, {
        animation: 'shift-toward-subtle',
        arrow: false,
        delay: [800, 0],
        theme: 'cobalt',
      });
    },
  };
})();

// Initialize the component
tooltip.init();
