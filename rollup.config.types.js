const packageInfo = require('./package.json')

const typeScript = require('@rollup/plugin-typescript')
const { default: dts } = require('rollup-plugin-dts')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')

export default {
	input: 'types/index.ts',
	plugins: [
    nodeResolve({ browser: true }),
		babel({ babelHelpers: 'bundled' }),
		typeScript(),
    dts(),
	],
	output: [
    {
      format: 'esm',
      file: packageInfo.types,
    }
	],
}
