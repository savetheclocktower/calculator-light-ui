'use babel';

import fs from 'fs';

function writeConfigFile (content, reload = false) {
  return new Promise((resolve, reject) => {
    if (!content) {
      return reject('No content given');
    }

    fs.writeFile(`${__dirname}/../../styles/user-settings.less`, content, 'utf8', (error) => {
      if (error) {
        return reject(`Couldn't write settings file.`);
      }
      if (reload) {
        let package = atom.packages.getLoadedPackage('calculator-light-ui');
        if (package) {
          package.deactivate();
          setImmediate(() => package.activate());
        }
      }
      return resolve();
    });
  });
}

export default writeConfigFile;
