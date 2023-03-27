// This is intentionally separate from index.ts since it needs to be downloaded in modern browsers
import { document, exists, window } from 'browser-monads-ts'
import '../types/Window'

// https://stackoverflow.com/a/10199306/1611058
function get_time_support(): boolean {
	if (!exists(window) || !exists(document)) {
		return false
	}

	const input = document.createElement('input')
	input.setAttribute('type', 'time')

	const notValid = 'not-a-time'
	input.setAttribute('value', notValid)

	return input.value !== notValid
}

const supportsTime = get_time_support()

if (exists(window)) {
	window.supportsTime = supportsTime
}

export default supportsTime
export { supportsTime }
