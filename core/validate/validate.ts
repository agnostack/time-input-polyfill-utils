import { TimeObject } from '../../types/timeObject'
import { String24hr, String12hr } from '../../types/strings'
import { is } from '../is/is'

export const validate = {
	string12hr: (string12hr: String12hr) => {
		if (!is.string12hr(string12hr)) {
			throw new Error(`"${string12hr}" is not a valid 12 hour time`)
		}
		return true
	},
	string24hr: (string24hr: String24hr) => {
		if (!is.string24hr(string24hr)) {
			throw new Error(`"${string24hr}" is not a valid 24 hour time`)
		}
		return true
	},
	timeObject: (timeObject: TimeObject) => {
		const { hrs24, hrs12, min, mode } = timeObject
		if (typeof hrs24 === 'number' && hrs24 > 23) {
			throw new Error('24 Hours cannot be higher than 23, use 0 instead')
		}
		if (typeof hrs24 === 'number' && hrs24 < 0) {
			throw new Error('24 Hours cannot be lower than 0')
		}
		if (typeof hrs12 === 'number' && hrs12 > 12) {
			throw new Error('12 Hours cannot be higher than 12')
		}
		if (typeof hrs12 === 'number' && hrs12 < 1) {
			throw new Error('12 Hours cannot be lower than 1')
		}

		if (typeof min === 'number' && min > 59) {
			throw new Error('Minutes cannot be higher than 59')
		}
		if (typeof min === 'number' && min < 0) {
			throw new Error('Minutes cannot be lower than 0')
		}

		if (['AM', 'PM', '--'].indexOf(mode) < 0) {
			throw new Error('Mode is invalid')
		}

		return true
	},
}
