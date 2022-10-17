import { attrElement } from 'src';
import tippy from 'tippy.js';

import './../style/style.css';

const tooltip = (function () {
  // Tooltip Settings
  const settings = {
    attribute: {
      tooltip: `[${attrElement}="tooltip"]`,
    },
  };

  const attributes = settings.attribute;

  return {
    init: function () {
      tippy(attributes.tooltip, {
        animation: 'shift-toward-subtle',
        arrow: false,
        delay: [800, 0],
        theme: 'cobalt',
      });
    },
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  tooltip.init();
});
