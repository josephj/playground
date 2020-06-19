// Polyfill for Node.js, won't be used in production
import { ReadableStream } from 'web-streams-polyfill/ponyfill';

//===========
// API Level
//===========
const getStatusCode = (max = 10) => {
  const value = Math.floor(Math.random() * Math.floor(max)) + 1;
  return value;
};

let timer = null;
const watch = (delay = 1000) =>
  new ReadableStream({
    start(controller) {
      controller.enqueue({ status: 'init' });
      const iterate = () => {
        const code = getStatusCode();
        const isMatched = code === 3;
        if (!isMatched) {
          controller.enqueue({ status: 'processing', code: code });
          timer = setTimeout(iterate, delay);
          return;
        }

        controller.enqueue({ status: 'complete', code: code });
        controller.close();
      };
      iterate();
    },
    cancel(reason) {
      console.log('cancelled because ' + reason);
      if (timer) clearTimeout(timer);
    }
  });

//===========
// Comsume
//===========
console.log('>>> START - It completes when code is 3 <<<');
const reader = watch().getReader();
let result;
const process = o => {
  if (o.done) return result;
  result = Object.assign({}, o.value);
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
