import { ReadableStream } from 'web-streams-polyfill';
import ncp from 'ncp';
import fs from 'fs';

//============
// API Level
//============
const copy = () =>
  new ReadableStream({
    start(controller) {
      const srcPath = '/Users/josephj/Sample Photos';
      const destPath = '/Users/josephj/IMAGE_STORAGE_PATH';
      const fileExtensions = ['jpg', 'jpeg', 'png', 'tif', 'tiff', 'bmp'];
      const isRecursive = true;
      console.info(`Copy image from ${srcPath} to ${destPath}`);
      ncp(
        srcPath,
        destPath,
        {
          filter: fileName => {
            if (fileName === srcPath) {
              return true;
            }
            if (fs.lstatSync(fileName).isDirectory() && isRecursive) {
              const hiddenDir = /(\/|^|.)\.[^/.]/gi;
              return !hiddenDir.test(fileName);
            }
            const reg = new RegExp(`.(${fileExtensions.join('|')})$`, 'i');
            return reg.test(fileName);
          },
          transform: (read, write, file) => {
            read.pipe(write);
            controller.enqueue(file); // SOLVED
          },
          clobber: false,
          stopOnErr: false
        },
        err => {
          if (err) {
            controller.close();
            throw err;
          }
          // console.info(`images are copied to ${destPath}`); // eslint-disable-line
          controller.close();
        }
      );
    },
    cancel() {}
  });

//============
// Read
//============
console.log('>>> START <<<');
const reader = copy().getReader();
let result;
const process = o => {
  if (o.done) return result;
  result = o.value;
  console.log(result);
  return reader.read().then(process);
};
reader
  .read()
  .then(process)
  .then(o => {
    // console.info(o)
    console.log('>>> END <<<');
  })
  .catch(e => console.log(e));
setTimeout(() => reader.cancel('timeout'), 5000);
