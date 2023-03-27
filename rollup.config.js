const packageInfo = require('./package.json')
const filesize = require('rollup-plugin-filesize')

const typeScript = require('@rollup/plugin-typescript')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { babel } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')

const _dependencies = Object.keys(packageInfo.dependencies || {})
const _peerDependencies = Object.keys(packageInfo.peerDependencies || {})
const _bundledDependencies = packageInfo.bundledDependencies || packageInfo.bundleDependencies || []
const extenalDependencies = [..._dependencies, ..._peerDependencies].filter((extenalDependency) => (
  !_bundledDependencies.includes(extenalDependency)
))

const globals = {
  ..._dependencies.reduce((_globals, _dependency) => ({
    ..._globals,
    [_dependency]: _dependency,
  }), {}),
  ..._peerDependencies.reduce((_globals, _dependency) => ({
    ..._globals,
    [_dependency]: _dependency,
  }), {}),
}

export default {
	input: 'timeInputPolyfillUtils.ts',
  external: extenalDependencies,
	plugins: [
    nodeResolve({ browser: true }),
		typeScript(),
		babel(),
		filesize(),
	],
	output: [
		...packageInfo.browser ? [{
      format: 'umd',
			globals,
      name: packageInfo.name,
      file: packageInfo.browser,
      inlineDynamicImports: true,
		}] : [],
		...packageInfo.jsdelivr ? [{
      format: 'umd',
			globals,
      name: packageInfo.name,
      file: packageInfo.jsdelivr,
      inlineDynamicImports: true,
			plugins: [terser({ output: { comments: /@preserve|@license|@copyright|@cc_on/i } })]
		}] : []
	],
}
