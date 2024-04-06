const { test, describe, it } = require("node:test");
const assert = require("node:assert");

const average = require("../utils/for_testing").average;

// Describe blocks in testing are used to group tests together into "logical collections"

/*
    Test output also uses name of describe block
    ▶ average
  ✔ of one value is the value itself (0.380916ms)
  ✔ of many is calculated right (0.041125ms)
  ✔ of empty array is zero (0.037334ms)
    ▶ average (1.100541ms)
*/
describe("average", () => {
  test("of one value is the value itself", () => {
    assert.strictEqual(average([1]), 1); // not necessary to store the output of the function in a variable to test
  });

  test("of many is calculated right", () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5);
  });

  test("of empty array is zero", () => {
    assert.strictEqual(average([]), 0);
  });

  // Can also use the it() function to define tests
  it("of many is calculated right", () => {
    assert.strictEqual(average([10, 20, 30]), 20);
  });
});
