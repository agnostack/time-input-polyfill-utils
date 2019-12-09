import * as helpersObject from './index'

declare global {
	interface Window {
		timePolyfillHelpers: any
	}
}

window.timePolyfillHelpers = helpersObject
