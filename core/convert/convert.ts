import { Hour24, Hour12, Mode, Minute, String24hr, String12hr } from '../../types/index'
import { TimeObject } from '../../types/timeObject'
import { isAmString24hr, isPmString24hr, isAmHrs24 } from '../is/is'
import { regex } from '../regex/regex'
import {
	validateString12hr,
	validateTimeObject,
	validateString24hr,
	validateHours24,
} from '../validate/validate'
import { blankValues } from '../../common/index'
import {
	ConvertString12hr,
	ConvertString24hr,
	ConvertHours24,
	ConvertTimeObject,
	ConvertDateObject,
} from './convert.types'
import { toLeadingZero, toNumber } from '../utils/utils'

export const convertString12hr: ConvertString12hr = string12hr => {
	validateString12hr(string12hr)
	return {
		to24hr(): String24hr {
			if (/-/.test(string12hr)) return ''
			const timeObject = convertString12hr(string12hr).toTimeObject()
			return convertTimeObject(timeObject).to24hr()
		},
		toTimeObject(): TimeObject {
			const result: Array<string> = regex.string12hr.exec(string12hr) || []
			const [hrs12, minutes, mode] = [
				<Hour12>toNumber(result[1]),
				<Minute>toNumber(result[2]),
				<Mode>result[3],
			]
			const getHrs24 = (): Hour24 => {
				if (typeof hrs12 === 'number') {
					if (mode === 'PM') {
						if (hrs12 === 12) {
							return 12
						} else if (hrs12 + 12 > 23) {
							return <Hour24>(hrs12 + 12 - 24)
						} else {
							return <Hour24>(hrs12 + 12)
						}
					} else if (mode === 'AM' && hrs12 === 12) {
						return 0
					}
				}
				return hrs12
			}
			const hrs24 = getHrs24()

			const timeObject: TimeObject = {
				hrs24,
				hrs12,
				minutes,
				mode,
			}

			validateTimeObject(timeObject)
			return timeObject
		},
	}
}
export const convertString24hr: ConvertString24hr = string24hr => {
	validateString24hr(string24hr)
	return {
		to12hr(): String24hr {
			if (string24hr === blankValues.string24hr) {
				return blankValues.string12hr
			}
			const timeObject = convertString24hr(string24hr).toTimeObject()
			return convertTimeObject(timeObject).to12hr()
		},
		toTimeObject(): TimeObject {
			if (string24hr === blankValues.string24hr) {
				return blankValues.timeObject
			}
			// string24hr
			const regResult: Array<string> = regex.string24hr.exec(string24hr) || []
			const [hrsString24, minString] = [regResult[1], regResult[2]]
			const [hrs24, minutes] = [<Hour24>toNumber(hrsString24), <Minute>toNumber(minString)]

			const timeObject: TimeObject = {
				hrs24,
				hrs12: convertHours24(hrs24).toHours12(),
				minutes,
				mode:
					(isAmString24hr(string24hr) && 'AM') ||
					(isPmString24hr(string24hr) && 'PM') ||
					null,
			}

			validateTimeObject(timeObject)
			return timeObject
		},
	}
}
export const convertTimeObject: ConvertTimeObject = (timeObject, skipValidation = false) => {
	if (!skipValidation) {
		validateTimeObject(timeObject)
	}
	const { hrs24, hrs12, minutes, mode } = timeObject
	const hrsString24 = toLeadingZero(hrs24)
	const hrsString12 = toLeadingZero(hrs12)
	const minString = toLeadingZero(minutes)
	return {
		to12hr: (): String12hr => `${hrsString12}:${minString} ${mode}`,
		to24hr: (): String24hr => {
			const string24hr = `${hrsString24}:${minString}`
			if (/-/.test(string24hr)) return ''
			return string24hr
		},
	}
}
export const convertHours24: ConvertHours24 = hours24 => {
	validateHours24(hours24)
	const getHours12 = (): Hour12 => {
		if (typeof hours24 === 'number') {
			if (hours24 <= 12) {
				if (hours24 === 0) {
					return 12
				} else {
					return <Hour12>hours24
				}
			} else {
				return <Hour12>(hours24 - 12)
			}
		}
		return hours24
	}
	return {
		toHours12: (): Hour12 => getHours12(),
	}
}
export const convertDateObject: ConvertDateObject = date => {
	return {
		to12hr(): String12hr {
			const timeObject = convertDateObject(date).toTimeObject()
			return convertTimeObject(timeObject).to12hr()
		},
		to24hr(): String24hr {
			const timeObject = convertDateObject(date).toTimeObject()
			return convertTimeObject(timeObject).to24hr()
		},
		toTimeObject(): TimeObject {
			const [hrs24, minutes] = [<Hour24>date.getHours(), <Minute>date.getMinutes()]
			const hrs12 = convertHours24(hrs24).toHours12()
			const mode: Mode = isAmHrs24(hrs24) ? 'AM' : 'PM'
			return { hrs24, hrs12, minutes, mode }
		},
	}
}
