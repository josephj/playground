const CustomEvent = require('./class');

describe('CustomEvent', () => {
  let widget;

  beforeEach(() => {
    widget = new CustomEvent();
  });

  afterEach(() => {
    widget = null;
  });

  it('has on and trigger methods', () => {
    expect(widget.on).toBeDefined();
    expect(widget.off).toBeDefined();
    expect(widget.trigger).toBeDefined();
  });

  it('calls the handler when an event is triggered', () => {
    const handler = jest.fn();
    widget.on('foo', handler);
    widget.trigger('foo');
    expect(handler).toHaveBeenCalled();
  });

  it('calls the handler with multiple arguments when an event is triggered', () => {
    const handler = jest.fn();
    widget.on('foo', handler);
    widget.trigger('foo', 1, 2, 3, 4);
    expect(handler).toHaveBeenCalledWith(1, 2, 3, 4);
  });
});
