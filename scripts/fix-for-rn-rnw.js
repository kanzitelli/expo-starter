const fs = require('fs');
const path = require('path');

const rnfixfolder = './node_modules/react-native/Libraries';
const dir = path.resolve(process.cwd(), rnfixfolder);

const walk = (dir, params) => {
  const { extensions, excludeFolders, folders } = params;
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) { 
      const folder = file.split('/').pop();

      if (
        !excludeFolders.includes(folder) &&
        folders.includes(folder)
      ) {
        results = results.concat(walk(file, params));
      }
    }
    else { 
      const razbor = file.split('.');

      if (razbor.length === 3) {
        const componentName = razbor[0];
        const fullExt = '.' + razbor.splice(1).join('.');
        const webExt = '.web.js';
        const fullComponentName = componentName + webExt;

        if (
          extensions.includes(fullExt) &&
          !fs.existsSync(fullComponentName)
        ) {
          fs.openSync(fullComponentName, 'w');
          results.push(fullComponentName);
        }
      }
    }
  });

  return results;
}

const start = async () => {
  const files =
    walk(
      dir,
      {
        extensions: ['.ios.js', '.android.js'],
        folders: ['Utilities', 'Image', 'StyleSheet', 'Alert', 'Network'],
        excludeFolders: ['__tests__', '__mocks__', '__flowtests__']
      }
    );

  console.log(files);
}

start();