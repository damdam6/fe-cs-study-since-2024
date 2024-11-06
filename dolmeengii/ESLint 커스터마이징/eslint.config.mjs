"use strict";

// Import the ESLint plugin locally
import eslintPluginDolmeengii from "./eslint-plugin-dolmeengii/index.js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },

    plugins: {
      dolmeengii: eslintPluginDolmeengii,
    },
    rules: {
      "dolmeengii/enforce-dolmeengii-dolmeengii": "error",
    },
  },
];
