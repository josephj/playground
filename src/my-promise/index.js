export default class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;

    // Store all onResolve and onReject functions
    this.callbacks = {
      resolved: [],
      rejected: []
    };

    const change = target => result => {
      if (this.status !== 'pending') return;
      this.status = target;
      this.value = result;
      // execute all saved .then callbacks
      this.callbacks[this.status].forEach(callback => {
        if (typeof callback !== 'function') return;
        callback(this.value);
      });
    };

    const resolve = change('resolved');
    const reject = change('rejected');

    try {
      // will be executed during new Promise
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(resolveFn, rejectFn) {
    if (typeof resolveFn !== 'function') resolveFn = result => result;
    if (typeof rejectFn !== 'function') rejectFn = result => result;

    return new MyPromise(resolve => {
      this.callbacks.resolved.push(result => {
        const promise = resolveFn(result);
        if (promise instanceof MyPromise) return promise.then(resolveFn);
        resolve(promise);
      });
    });
  }
}

const p1 = new MyPromise(resolve => {
  resolve(1);
});
console.log(p1);

const p2 = new MyPromise(resolve => {
  setTimeout(() => {
    resolve(2);
  }, 500);
});
console.log(p2);
setTimeout(() => {
  console.log(p2);
}, 1000);
p2.then(result => {
  console.log(result);
  return result + 1;
}).then(result => {
  console.log(result);
});

// myPromise.then(result => console.log(result))
