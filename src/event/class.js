class CustomEvent {
  constructor() {
    this.handlers = [];
  }
  trigger(type, ...args) {
    const handlers = this.handlers.filter(handler => (handler.type = type));
    handlers.forEach(handler => handler.handler(...args));
  }
  on(type, handler) {
    this.handlers.push({ type, handler });
  }
  off(type, handler) {
    const index = this.handlers.filter(
      h => h.handler === handler && h.type === type
    );
    if (index > -1) {
      this.handlers.splice(index, 1);
    }
  }
}

const event1 = new CustomEvent();
const doFoo = () => console.log('foo');
const doBar = () => console.log('bar');
event1.on('foo', doFoo);
event1.on('bar', doBar);
event1.on('foo', (a, b, c) => {
  console.log('a, b, c: ', a, b, c);
});
event1.trigger('foo', '1', '2', '3');
console.log(event1.handlers);

event1.off('foo', doFoo);
event1.off('bar', doBar);
console.log(event1.handlers);

module.exports = CustomEvent;
