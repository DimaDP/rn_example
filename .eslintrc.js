module.exports = {
  root: true,
  extends: ['@react-native-community'],
  plugins: ['prettier', 'eslint-plugin-react'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-single'],
    'react-native/no-inline-styles': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'warn',
  },
};
