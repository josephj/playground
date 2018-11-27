export let _listeners = [];

export const on = (type, handler, options = {}) => {
  let listeners = options.listeners || _listeners;
  listeners.push({ type, handler });
};

export const emit = (type, args = [], options = {}) => {
  let listeners = options.listeners || _listeners;
  listeners.filter(listener => listener.type === type);
  listeners.forEach(listener => listener.handler(args));
};

export const off = (type, handler, options = {}) => {
  let listeners = options.listeners || _listeners;
  const indexes = listeners.reduceRight((results, listener, i) => {
    if (handler) {
      if (listener.type === type && listener.handler === handler) {
        results.push(i);
        return results;
      }
    } else {
      if (listener.type === type) {
        results.push(i);
        return results;
      }
    }
    return results;
  }, []);
  indexes.forEach(i => listeners.splice(i, 1));
};

export const getListeners = (type, options = {}) => {
  let listeners = options.listeners || _listeners;
  if (!type) {
    return listeners;
  }
  return listeners.filter(listener => listener.type === type);
};

// Inline tests
// const doFoo = () => {
//   console.log('foo');
// };
// const doBar = (...args) => {
//   console.log('bar');
//   console.log(args);
// };

// on('foo', doFoo);
// on('bar', doBar);
// emit('bar', 1, 2, 3, 4);
// off('barx', doBar);
// off('foo', doFoo);
// const allHandlers = getListeners();
// const barHandlers = getListeners('bar');
// barHandlers;
// allHandlers;

export default {
  on,
  off,
  emit,
  getListeners
};
