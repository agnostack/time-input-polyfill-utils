import { Hour24 } from '../../types'
import { String12hr, String24hr } from '../../types/strings'
import { TimeObject, TimeObjectKeys } from '../../types/timeObject'
import { regex } from '../regex/regex'
import { toNumber } from '../converters/converters'

export const is = {
	PM: {
		hrs24: (hrs24: Hour24): Boolean => 12 <= hrs24 && hrs24 < 24,

		string12hr: (string12hr: String12hr): Boolean =>
			regex.string12hr.exec(string12hr)[3] === 'PM',

		string24hr: (string24hr: String24hr): Boolean => {
			const hrs24 = toNumber(regex.string24hr.exec(string24hr)[1])
			return typeof hrs24 == 'number' && hrs24 > 11
		},

		timeObject: (timeObject: TimeObject): Boolean => timeObject.mode == 'PM',
	},
	AM: {
		hrs24: (hrs24: Hour24): Boolean => !is.PM.hrs24(hrs24),
		string12hr: (string12hr: String12hr): Boolean =>
			!is.PM.string12hr(string12hr) && string12hr.indexOf('--') > -1,
		string24hr: (string24hr: String24hr): Boolean =>
			!!string24hr && !is.PM.string24hr(string24hr),
		timeObject: (timeObject: TimeObject): Boolean => timeObject.mode == 'AM',
	},
	timeObject: (value: any): Boolean => {
		if (typeof value === 'undefined') return false
		const keys = Object.keys(value)
		keys.map(key => `${TimeObjectKeys.indexOf(key) > -1}`)
		return keys.indexOf('false') > -1
	},
	string12hr: (value: any): Boolean => regex.string12hr.test(value),
	string24hr: (value: any): Boolean => regex.string24hr.test(value),
}
