import { on, emit, off, getListeners } from './functional';

describe('Event Utility', () => {
  let options = { listeners: [] };
  beforeEach(() => {
    options = { listeners: [] };
  });
  it('calls the handler when an event is triggered', () => {
    const handler = jest.fn();
    on('foo', handler, options);
    emit('foo', undefined, options);
    expect(handler).toHaveBeenCalled();
  });
  it('calls the multiple handlers when an event is triggered', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    on('foo', handler1, options);
    on('foo', handler2, options);
    emit('foo', undefined, options);
    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });
  it('unsubscribes a handler', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    on('foo', handler1, options);
    on('foo', handler2, options);
    off('foo', handler1, options);
    emit('foo', undefined, options);
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
  });
  it('unsubscribes a handler', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const handler3 = jest.fn();
    on('foo', handler1, options);
    on('foo', handler2, options);
    on('foo', handler3, options);
    off('foo', undefined, options);
    emit('foo', undefined, options);
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
    expect(handler3).not.toHaveBeenCalled();
  });
  it('gets all exisiting listeners', () => {
    const handler1 = () => {};
    const handler2 = () => {};
    on('foo', handler1, options);
    on('foo', handler2, options);
    emit('foo', undefined, options);
    const handlers = getListeners(undefined, options);
    expect(handlers.length).toEqual(2);
  });
  it('gets all listeners for one type', () => {
    const handler1 = () => {};
    const handler2 = () => {};
    on('foo', handler1, options);
    on('foo', handler2, options);
    on('bar', () => {}, options);
    on('zoo', () => {}, options);
    const handlers = getListeners('foo', options);
    expect(handlers.length).toEqual(2);
  });
});
