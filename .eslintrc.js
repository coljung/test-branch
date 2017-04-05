module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: 'airbnb-base',
  // add your custom rules here
  'rules': {
    'import/no-unresolved': 0,
        // dont require extensions for imports
    'import/extensions': 0,
    // 'import/newline-after-import': 0,
        // indent 4 spaces and aligns switchcase
    'indent': [2, 4,  { 'SwitchCase': 1 }],
    'no-unused-vars': 0,
    'max-len': ['warn', 200],
    // 'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'no-plusplus':[2, { "allowForLoopAfterthoughts": true }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
