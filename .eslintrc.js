module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  globals: {
    // _: "readonly",
    // echarts: "readonly",
  },
  /**
   * eslint-plugin-prettier exposes a "recommended" configuration
   * that configures both eslint-plugin-prettier and eslint-config-prettier in a single step.
   * Add both eslint-plugin-prettier and eslint-config-prettier as developer dependencies,
   * then extend the recommended config: 'plugin:prettier/recommended'
   */
  extends: ['plugin:vue/essential', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-console': 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
