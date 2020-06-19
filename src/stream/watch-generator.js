//===========
// API Level
//===========
const getStatusCode = (max = 10) => {
  const value = Math.floor(Math.random() * Math.floor(max)) + 1;
  return value;
};

const delay = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

const watch = async function*(ms = 1000) {
  while (true) {
    yield getStatusCode();
    await delay(ms);
  }
};

//===========
// User Level
//===========
(async () => {
  const iterator = watch(1000);
  for await (const value of iterator) {
    console.log('processing', value);
    if (value === 3) {
      console.log('complete', value);
      iterator.return(value);
    }
  }
})();
