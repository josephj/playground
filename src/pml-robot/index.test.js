import { work } from './index.js';

function repeat(str, times = 1) {
  let result = '';
  for (let i = 0; i < times; i++) {
    result += str;
  }
  return result;
}

describe('PML Robot', () => {
  const defaultValue = '0x0,1x0,2x0,3x0,4x0,5x0,6x0,7x0,8x0,9x0';
  it('returns the default store with no arguments provided', () => {
    const result = work();
    expect(result).toEqual(defaultValue);
  });
  it('returns the default store when it only has P', () => {
    const result = work(repeat('P', 20));
    expect(result).toEqual(defaultValue);
  });
  it('returns the default store when it only has M', () => {
    const result = work(repeat('M', 20));
    expect(result).toEqual(defaultValue);
  });
  it('returns the default store when it only has L', () => {
    const result = work(repeat('L', 20));
    expect(result).toEqual(defaultValue);
  });
  it('PL * 5', () => {
    const result = work(repeat('PL', 5));
    expect(result).toEqual('0x5,1x0,2x0,3x0,4x0,5x0,6x0,7x0,8x0,9x0');
  });
  it('PML * 5', () => {
    const result = work(repeat('PML', 5));
    expect(result).toEqual('0x0,1x5,2x0,3x0,4x0,5x0,6x0,7x0,8x0,9x0');
  });
  it('PML * 100', () => {
    const result = work(repeat('PML', 100));
    expect(result).toEqual('0x0,1xf,2x0,3x0,4x0,5x0,6x0,7x0,8x0,9x0');
  });
  it('P +  M * 20 + L', () => {
    const result = work('P' + repeat('M', 20) + 'L');
    expect(result).toEqual('0x0,1x0,2x0,3x0,4x0,5x0,6x0,7x0,8x0,9x1');
  });
});
