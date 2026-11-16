// Lint exists mainly to catch undefined identifiers (e.g. an icon used but never imported),
// which esbuild/Vite do not report at build time.
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  plugins: ['react'],
  settings: { react: { version: '18.2' } },
  extends: ['eslint:recommended'],
  rules: {
    'no-undef': 'error', 'react/jsx-no-undef': 'error', 'react/jsx-uses-vars': 'error', 'react/jsx-uses-react': 'off',
    'no-unused-vars': ['warn', { args: 'none', varsIgnorePattern: '^_' }],
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'no-useless-escape': 'off', 'no-prototype-builtins': 'off', 'no-case-declarations': 'off', 'no-inner-declarations': 'off',
  },
  ignorePatterns: ['dist', 'dist-standalone', 'node_modules', 'EduTugOfWar.html'],
};
