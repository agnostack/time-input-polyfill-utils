import { TimeObject, String12hr, String24hr, Hour12 } from '../../types'
import { convert } from '../converters/converters'
import { maxAndMins } from '../staticValues'

export const modify = {
	string12hr: (string12hr: String12hr) => ({
		increment: {
			hrs12: (): String12hr => {
				const timeObject = convert.string12hr(string12hr).toTimeObject()
				const modifiedObject = modify.timeObject(timeObject).increment.hrs12()
				return convert.timeObject(modifiedObject).to12hr()
			},
		},
	}),
	string24hr: (string24hr: String24hr) => ({
		increment: {
			hrs12: (): String24hr => {
				const timeObject = convert.string24hr(string24hr).toTimeObject()
				const modifiedObject = modify.timeObject(timeObject).increment.hrs12()
				return convert.timeObject(modifiedObject).to24hr()
			},
		},
	}),
	timeObject: (timeObject: TimeObject) => ({
		increment: {
			hrs12: (): TimeObject => {
				const { hrs12 } = timeObject
				const copiedObject = { ...timeObject }

				if (typeof hrs12 === 'number') {
					if (hrs12 === 11) {
						copiedObject.hrs12 = 12
					} else {
						if (hrs12 === maxAndMins.hrs12.max) {
							copiedObject.hrs12 = maxAndMins.hrs12.min
						}

						if (hrs12 < maxAndMins.hrs12.max) {
							copiedObject.hrs12 = <Hour12>(hrs12 + 1)
						}
					}
				} else {
					copiedObject.hrs12 = '--'
				}

				// This aligns the hrs24 value with the hrs12 value
				const newString12hr = convert.timeObject(copiedObject).to12hr()
				return convert.string12hr(newString12hr).toTimeObject()
			},
		},
	}),
}
