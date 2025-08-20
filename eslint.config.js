const js = require("@eslint/js");
const typescript = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const importPlugin = require("eslint-plugin-import");
const reactPlugin = require("eslint-plugin-react");
const prettier = require("eslint-plugin-prettier");
const reactHooks = require("eslint-plugin-react-hooks");

const excalidrawPlugin = require("./scripts/eslint-plugin-excalidraw");

module.exports = [
  {
    ignores: [
      "node_modules/",
      "build/",
      "package-lock.json",
      ".vscode/",
      "firebase/",
      "dist/",
      "public/workbox",
      "packages/excalidraw/types",
      "examples/**/public",
      "dev-dist",
      "coverage",
    ],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        URL: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        navigator: "readonly",
        location: "readonly",
        alert: "readonly",
        confirm: "readonly",
        prompt: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      import: importPlugin,
      react: reactPlugin,
      prettier,
      "react-hooks": reactHooks,
      excalidraw: excalidrawPlugin,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "@excalidraw/**",
              group: "external",
              position: "after",
            },
          ],
          "newlines-between": "always-and-inside-groups",
          warnOnUnassignedImports: true,
        },
      ],
      //
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      curly: "warn",
      "dot-notation": "warn",
      "no-console": [
        "warn",
        {
          allow: ["warn", "error", "info"],
        },
      ],
      "no-else-return": "warn",
      "no-lonely-if": "warn",
      "no-restricted-globals": "off",
      "no-restricted-syntax": [
        "warn",
        {
          message: "Use 't(...)' instead of literal text in JSX",
          selector: "JSXText[value=/\\w/]",
        },
      ],
      "no-unneeded-ternary": "warn",
      "no-unused-expressions": "warn",
      "no-useless-return": "warn",
      "no-var": "warn",
      "object-shorthand": "warn",
      "one-var": ["warn", "never"],
      "prefer-arrow-callback": "warn",
      "prefer-const": [
        "warn",
        {
          destructuring: "all",
        },
      ],
      "prefer-template": "warn",
      "prettier/prettier": "warn",
      //
      "import/no-anonymous-default-export": "off",
      "no-restricted-globals": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
          fixStyle: "separate-type-imports",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          name: "jotai",
          message:
            'Do not import from "jotai" directly. Use our app-specific modules ("editor-jotai" or "app-jotai").',
        },
      ],
      "react/jsx-no-target-blank": [
        "error",
        {
          allowReferrer: true,
        },
      ],
      "excalidraw/no-direct-binding-mutation": "error",
    },
  },
];
