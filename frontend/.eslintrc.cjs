module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react", "react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/jsx-uses-react": "error",
    "react/jsx-no-undef": "error",
    "react-hooks/rules-of-hooks": "error",
    "react/no-unescaped-entities": 0,
    "no-console": "warn",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "no-var": "error",
  },
};
