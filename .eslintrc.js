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
		indent: ['error', 'tab'],
		'@typescript-eslint/indent': ['error', 'tab'],
		quotes: ['error', 'single'],
		'@typescript-eslint/semi': ['error', 'never'],
		semi: ['error', 'never'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ vars: 'all', args: 'after-used', ignoreRestSiblings: true },
		],
	},
}
