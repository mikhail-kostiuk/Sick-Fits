import formatMoney from "../lib/formatMoney";

describe("formatMoney function", () => {
  it("works with fractional dollars", () => {
    expect(formatMoney(1)).toEqual("$0.01");
    expect(formatMoney(20)).toEqual("$0.20");
    expect(formatMoney(79)).toEqual("$0.79");
    expect(formatMoney(85)).toEqual("$0.85");
  });

  it("leaves cents off for whole dollars", () => {
    expect(formatMoney(700)).toEqual("$7");
    expect(formatMoney(2100)).toEqual("$21");
    expect(formatMoney(3000)).toEqual("$30");
    expect(formatMoney(11000)).toEqual("$110");
  });

  it("works with whole and fractional dollars", () => {
    expect(formatMoney(315)).toEqual("$3.15");
    expect(formatMoney(5133)).toEqual("$51.33");
    expect(formatMoney(6901)).toEqual("$69.01");
    expect(formatMoney(12007)).toEqual("$120.07");
  });
});
