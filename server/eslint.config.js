import pluginN from 'eslint-plugin-n';

export default [
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      n: pluginN
    },
    rules: {
      'n/no-missing-import': 'error',
      'n/no-unpublished-import': 'error'
    }
  }
];