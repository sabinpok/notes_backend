const { test } = require("node:test"); // node test library expects by default the names of test files to contain .test
const assert = require("node:assert"); // used by test to check results of functions under test

const reverse = require("../utils/for_testing").reverse; // import the function to test

/*
    Form of a test case using test() function:
    1st param defines the test case
    2nd param is a function that defines the functionality for test case

*/
test("reverse of a", () => {
  const result = reverse("a"); // execute the code to be tested

  assert.strictEqual(result, "a"); // verify the results
});

test("reverse of react", () => {
  const result = reverse("react");

  assert.strictEqual(result, "tcaer");
});

test("reverse of saippuakauppias", () => {
  const result = reverse("saippuakauppias");

  assert.strictEqual(result, "saippuakauppias");
});

// test("reverse of react", () => {
//   const result = reverse("react");

//   assert.strictEqual(result, "tkaer");
// });

/* 
    This error message was generated when the above test case failed:

    ✖ reverse of react (0.944916ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
  + actual - expected
  
  + 'tcaer'
  - 'tkaer'
      at TestContext.<anonymous> (/Users/sabinpokhrel/notes_backend/tests/reverse.test.js:33:10)
      at Test.runInAsyncScope (node:async_hooks:203:9)
      at Test.run (node:internal/test_runner/test:573:25)
      at Test.processPendingSubtests (node:internal/test_runner/test:318:18)
      at Test.postRun (node:internal/test_runner/test:642:19)
      at Test.run (node:internal/test_runner/test:601:10)
      at async Test.processPendingSubtests (node:internal/test_runner/test:318:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 'tcaer',
    expected: 'tkaer',
    operator: 'strictEqual'
  }    
*/
