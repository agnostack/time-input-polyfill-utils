// This is intentionally separate from index.ts since it needs to be downloaded in modern browsers

// https://stackoverflow.com/a/10199306/1611058
function get_time_support(): boolean {
	const input = document.createElement('input')
	input.setAttribute('type', 'time')

	const notValid = 'not-a-time'
	input.setAttribute('value', notValid)

	return input.value !== notValid
}

const timeSupport = get_time_support()

if (window) window.supportsTime = timeSupport
export default timeSupport
