import { Hour24 } from '../../types'
import { String12hr } from '../../types/strings'
import { TimeObject, TimeObjectKeys } from '../../types/timeObject'
import { regex } from '../regex/regex'
import { get } from '../getters/getters'

export const is = {
	PM: {
		hrs24: (hrs24: Hour24) => 12 <= hrs24 && hrs24 < 24,
		string12hr: (string12hr: String12hr) => get.string12hr(string12hr).mode === 'PM',
		string24hr: (string12hr: String12hr) => get.string24hr(string12hr).mode === 'PM',
		timeObject: (timeObject: TimeObject) => timeObject.mode == 'PM',
	},
	AM: {
		hrs24: (hrs24: Hour24) => !is.PM.hrs24(hrs24),
		string12hr: (string12hr: String12hr) => get.string12hr(string12hr).mode === 'AM',
		string24hr: (string12hr: String12hr) => get.string24hr(string12hr).mode === 'AM',
		timeObject: (timeObject: TimeObject) => timeObject.mode == 'AM',
	},
	timeObject: (value: any) => {
		if (typeof value === 'undefined') return false
		const keys = Object.keys(value)
		keys.map(key => `${TimeObjectKeys.indexOf(key) > -1}`)
		return keys.indexOf('false') > -1
	},
	string12hr: (value: any) => regex.string12hr.test(value),
	string24hr: (value: any) => regex.string24hr.test(value),
}
