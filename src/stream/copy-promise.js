import ncp from 'ncp';
import fs from 'fs';


const filter = (srcPath, fileExtensions, isRecursive) => fileName => {
    console.log('fileName :', fileName, new Date().getTime()); // How can we get this stream?
    if (fileName === srcPath) {
        return true;
    }
    if (fs.lstatSync(fileName).isDirectory() && isRecursive) {
        const hiddenDir = /(\/|^|.)\.[^/.]/gi;
        return !hiddenDir.test(fileName);
    }
    const reg = new RegExp(`.(${fileExtensions.join('|')})$`, 'i');
    return reg.test(fileName);
};

const copy = () => new Promise((resolve, reject) => {
    const srcPath = '/Users/josephj/Sample Photos';
    const destPath = '/dev/null';
    const fileExtensions =  ['jpg', 'jpeg', 'png', 'tif', 'tiff', 'bmp'];
    const isRecursive = true;
    console.info(`Copy image from ${srcPath} to ${destPath}`); 
    ncp(
        '/Users/josephj/Sample Photos',
        '/dev/null',
        {
            filter: filter(srcPath, fileExtensions, isRecursive),
            clobber: false,
            stopOnErr: false,
        },
        err => {
            if (err) {
                reject(err);
                return;
            }
            console.info(`images are copied to ${destPath}`); // eslint-disable-line
            resolve();
        }
    );
})

copy();