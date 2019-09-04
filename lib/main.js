'use babel';

import writeConfigFile from './helpers/write-config-file';

let _baseColor;

function buildColorSettings (baseColor) {
  return `@base-color: ${baseColor};`;
}

let _manageMiniEditors;
function buildMiniEditorSettings (manageMiniEditors) {
  let importString = ``;
  if (manageMiniEditors) {
    importString = `@import "optional/mini-editor.less";`
  }
  return `
@setting-manage-mini-editors: ${manageMiniEditors};
${importString}
`;
}

function buildConfigFile () {
  return `
${buildColorSettings(_baseColor)}

${buildMiniEditorSettings(_manageMiniEditors)}
`;
}

function rewriteConfigFile () {
  // Only instantly reload if we're not in dev mode. In dev mode we'll be
  // reloading anyway upon file change, so we don't want to trigger an
  // infinite loop.
  return writeConfigFile(
    buildConfigFile(),
    !atom.inDevMode()
  );
}

export default {
  activate () {
    _baseColor = atom.config.get('calculator-light-ui.baseColor');
    _manageMiniEditors = atom.config.get('calculator-light-ui.manageMiniEditors')

    atom.config.observe('calculator-light-ui.baseColor', (color) => {
      _baseColor = `rgba(${color._red}, ${color._green}, ${color._blue}, ${color._alpha})`;
      return rewriteConfigFile();
    });

    atom.config.observe('calculator-light-ui.manageMiniEditors', (bool) => {
      _manageMiniEditors = bool;
      return rewriteConfigFile();
    });
  }
};
