module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:prettier/recommended',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['prettier', '@typescript-eslint'],
	rules: {
		'prettier/prettier': 'error',

		// Prettier and ES Lint disagree about how some indents should work.
		// I can't stop Prettier but I can stop ES Lint
		indent: [0, 'tab'],
		'@typescript-eslint/indent': [0, 'tab'],

		quotes: ['error', 'single'],
		'@typescript-eslint/semi': ['error', 'never'],
		semi: ['error', 'never'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ vars: 'all', args: 'after-used', ignoreRestSiblings: true },
		],
	},
}
