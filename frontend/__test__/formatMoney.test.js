import formatMoney from '../lib/formatMoney';

describe('format monet function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
  });

  it('leaves off cents when its  whole dollars', () => {
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(100)).toEqual('$1');
  });

  it('works with whole and fractional dollars', () => {
    expect(formatMoney(140)).toEqual('$1.40');
  });
});
