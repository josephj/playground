const watch = (delay = 1000, onComplete, onProcessing) => {
  const worker = new Worker('worker.js');
  worker.onmessage = e => {
    const { status, count, code } = e.data;
    switch (status) {
      case 'complete':
        onComplete(count, code);
        break;
      case 'processing':
      default:
        onProcessing(count, code);
        break;
    }
  };
  worker.postMessage({ action: 'start', delay });
  return {
    stop: () => {
      worker.postMessage({ action: 'stop' });
    }
  };
};

watch(
  1000,
  count => {
    console.log('complete');
  },
  (count, code) => {
    console.log(`processing #${count}, code = ${code}`);
  }
);
