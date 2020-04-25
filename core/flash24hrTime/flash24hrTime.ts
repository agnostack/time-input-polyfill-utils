import { String12hr } from '../../types/index'
import { Flash24hrTime } from './flash24hrTime.types'
import { convertString12hr } from '../convert/convert'

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
