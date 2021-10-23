import { Polyfill } from './Polyfill'

declare global {
	interface Window {
		timeInputPolyfillUtils: Polyfill
		supportsTime?: boolean
	}
}

// Needed for telling Typescript that this file can be imported
export default {}
