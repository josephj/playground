import ncp from 'ncp';
import fs from 'fs';
import { Observable } from 'rxjs';

const copy = Observable.create(observer => {
  const srcPath = '/Users/josephj/Sample Photos';
  const destPath = '/dev/null';
  const fileExtensions = ['jpg', 'jpeg', 'png', 'tif', 'tiff', 'bmp'];
  const isRecursive = true;
  console.info(`Copy image from ${srcPath} to ${destPath}`);
  ncp(
    '/Users/josephj/Sample Photos',
    '/dev/null',
    {
      filter: fileName => {
        observer.next(fileName); // SOLVED
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
      clobber: false,
      stopOnErr: false
    },
    err => {
      if (err) {
        observer.err(err);
        return;
      }
      console.info(`images are copied to ${destPath}`); // eslint-disable-line
      observer.complete();
    }
  );
});

copy.subscribe(val => console.log(val));
