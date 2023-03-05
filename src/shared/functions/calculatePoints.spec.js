import { calculatePoints } from "./calculatePoints";

describe("calculatePoints", () => {
  it("30$ should be 0", () => {
    expect(calculatePoints(30)).toBe(0);
  });
  it("40.50$ should be 0", () => {
    expect(calculatePoints(40.50)).toBe(0);
  });
  it("56$ should be 6", () => {
    expect(calculatePoints(56)).toBe(6);
  });
  it("90.54$ should be 40", () => {
    expect(calculatePoints(90.54)).toBe(40);
  });
  it("123$ should be 96", () => {
    expect(calculatePoints(123)).toBe(96);
  });
  it("1000$ should be 1850", () => {
    expect(calculatePoints(1000)).toBe(1850);
  });
});
