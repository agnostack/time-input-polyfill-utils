var typeScript = require('@rollup/plugin-typescript')
var babel = require('rollup-plugin-babel')
var { terser } = require('rollup-plugin-terser')

export default {
	input: 'timeInputPolyfillUtils.ts',
	plugins: [typeScript(), babel(), terser()],
	output: {
		file: 'dist/timeInputPolyfillUtils.min.js',
		format: 'iife',
	},
}
