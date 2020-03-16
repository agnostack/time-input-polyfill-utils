import * as utils from './index'

declare global {
	interface Window {
		timeInputPolyfillUtils: any
	}
}

window.timeInputPolyfillUtils = utils
