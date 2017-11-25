'use babel';

import writeConfigFile from './helpers/write-config-file';

function buildColorSettings (baseColor) {
  return `
@base-color: ${baseColor};
  `;
}

export default {
  activate () {
    let color = atom.config.get('calculator-light-ui.baseColor');

    atom.config.observe('calculator-light-ui.baseColor', (color) => {
      let baseColor = `rgba(${color._red}, ${color._green}, ${color._blue}, ${color._alpha})`

      // Only instantly reload if we're not in dev mode. In dev mode we'll be
      // reloading anyway upon file change, so we don't want to trigger an
      // infinite loop.
      return writeConfigFile(
        buildColorSettings(baseColor),
        !atom.inDevMode()
      );
    });
  }
};
