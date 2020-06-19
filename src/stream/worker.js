const getStatusCode = (max = 5) => {
  const value = Math.floor(Math.random() * Math.floor(max)) + 1;
  return value;
};

let count = 0;
let timer = null;

const start = delay => {
  const iterate = () => {
    const code = getStatusCode(5);
    const isMatched = code === 3;
    if (!isMatched) {
      postMessage({ status: 'processing', count });
      timer = setTimeout(iterate, delay);
      return;
    }
    postMessage({ status: 'complete', count });
  };
  iterate();
};

onmessage = function(e) {
  const { action, delay } = e.data;
  switch (action) {
    case 'stop':
      clearTimeout(timer);
      break;
    default:
    case 'start':
      start(delay);
      break;
  }
};
