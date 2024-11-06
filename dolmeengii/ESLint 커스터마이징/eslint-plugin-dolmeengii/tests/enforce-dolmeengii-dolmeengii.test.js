// enforce-dolmeengii-dolmeengii.test.js
import { RuleTester } from "eslint";
import dolmeengiiRule from "../rules/enforce-dolmeengii-dolmeengii.js";

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 2015 },
});

ruleTester.run(
  "enforce-dolmeengii-dolmeengii", // rule name
  dolmeengiiRule, // rule code
  {
    // checks
    // 'valid' checks cases that should pass
    valid: [
      {
        code: "const dolmeengii = 'dolmeengii';",
      },
    ],
    // 'invalid' checks cases that should not pass
    invalid: [
      {
        code: "const dolmeengii = 'dolli';",
        output: 'const dolmeengii = "dolmeengii";',
        errors: 1,
      },
    ],
  }
);

console.log("All tests passed!");
