import { ToArray, ToNumber, ToLeadingZero, Flash24hrTime } from './utils.types'
import { String12hr } from '../../types/index'
import { convertString12hr } from '../convert/convert'

export const toArray: ToArray = NodeList => Array.prototype.slice.call(NodeList, 0)

export const toNumber: ToNumber = value => {
	const number = Number(value)
	return isNaN(number) ? value : number
}

export const toLeadingZero: ToLeadingZero = value => {
	const number = Number(value)
	if (isNaN(number) && typeof value !== 'number') return value
	return number < 10 ? `0${number}` : `${number}`
}

// Used for quickly switching an input from 12hr to 24hr then back to 12hr.
// This is useful when the user submits forms.
// It will sends 24hr time to the server on submit like modern browsers do.
// Not adding a form event listener, different frameworks might handle submit differently
export const flash24hrTime: Flash24hrTime = $input => {
	const value12hr = <String12hr>$input.value
	$input.value = convertString12hr(value12hr).to24hr()
	setTimeout(() => {
		$input.value = value12hr
	}, 1)
}
