import { TimeObjectKeys } from '../../types/timeObject'
import { regex } from '../regex/regex'
import { toNumber } from '../convert/convert'
import { ValidateTimeStringProps, Is } from './is.types'

const isValidTimeString = ({
	value,
	format,
	minHrs,
	maxHrs,
}: ValidateTimeStringProps): Boolean => {
	const isFormatValid = regex[format].test(value)
	if (!isFormatValid) return false
	const parsedString = regex[format].exec(value)
	const hrsVal = toNumber(parsedString[1])
	const minsVal = toNumber(parsedString[2])
	const isHrsValid = hrsVal === '--' || (hrsVal >= minHrs && hrsVal <= maxHrs)
	const isMinsValid = minsVal === '--' || (minsVal >= 0 && minsVal <= 59)
	return isHrsValid && isMinsValid
}

export const is: Is = {
	PM: {
		hrs24: (hrs24) => 12 <= hrs24 && hrs24 < 24,

		string12hr: (string12hr) =>
			regex.string12hr.exec(string12hr)[3] === 'PM',

		string24hr: (string24hr) => {
			if (string24hr === '') return false
			const hrs24 = toNumber(regex.string24hr.exec(string24hr)[1])
			return typeof hrs24 == 'number' && hrs24 > 11
		},

		timeObject: (timeObject) => timeObject.mode === 'PM' || timeObject.mode === '--' && new Date().getHours() > 11,
	},
	AM: {
		hrs24: (hrs24) => hrs24 !== '--' && !is.PM.hrs24(hrs24),
		string12hr: (string12hr) =>
			regex.string12hr.test(string12hr) &&
			string12hr.indexOf('--') === -1 &&
			!is.PM.string12hr(string12hr),
		string24hr: (string24hr) =>
			string24hr !== '' && !is.PM.string24hr(string24hr),
		timeObject: (timeObject) => !is.PM.timeObject(timeObject),
	},
	timeObject: (value) => {
		if (typeof value === 'undefined' || typeof value !== 'object') return false
		const keys = Object.keys(value)
		if (keys.length === 0) return false
		const filteredKeys = TimeObjectKeys.filter((key: string) => keys.indexOf(key) === -1)
		const additionalKeys = keys.filter((key: string) => TimeObjectKeys.indexOf(key) === -1)
		return filteredKeys.length === 0 && additionalKeys.length === 0
	},
	string12hr: (value) =>
		isValidTimeString({ value, format: 'string12hr', minHrs: 1, maxHrs: 12 }),
	string24hr: (value) => {
		if (value === '') return true
		return isValidTimeString({ value, format: 'string24hr', minHrs: 0, maxHrs: 23 })
	},
}
