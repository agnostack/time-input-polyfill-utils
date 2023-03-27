import { exists, window } from 'browser-monads-ts'
import * as utils from './index'
import './types/Window'

if (exists(window)) {
	window.timeInputPolyfillUtils = utils
}
