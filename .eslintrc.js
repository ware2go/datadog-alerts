module.exports = {
    extends: ["airbnb-base", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts"]
      },
      "import/resolver": {
        typescript: {}
      }
    },
    rules: {
      "import/extensions": ["error", "never"],
      "import/no-extraneous-dependencies": [
        2,
        {
          devDependencies: ["**/test.ts"]
        }
      ],
      "import/prefer-default-export": "off",
      "@typescript-eslint/indent": [2, 2],
      "no-new": "off"
    }
  };
  