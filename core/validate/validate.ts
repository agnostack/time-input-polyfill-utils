import { TimeObject } from '../../types/timeObject'

export const validate = {
	timeObject: (timeObject: TimeObject) => {
		const { hrs24, hrs12, min, mode } = timeObject
		if (typeof hrs24 === 'number' && hrs24 > 24) {
			throw new Error('24 Hours cannot be higher than 24')
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

		if (['AM', 'PM', '--'].includes(mode)) {
			throw new Error('Mode is invalid')
		}
	},
}
