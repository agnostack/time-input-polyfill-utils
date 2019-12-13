import { Hour24, Hour12, Mode, Minute } from '../../types'
import { TimeObject } from '../../types/timeObject'
import { get } from '../getters/getters'
import { String24hr, String12hr } from '../../types/strings'
import { is } from '../is/is'
import { regex } from '../regex/regex'

// Can't really test this one since it needs a node list as input which isn't possible in Node.js
export const toArray = (NodeList: NodeList) =>
	Array.prototype.slice.call(NodeList, 0)

export const convert = {
	thing: (value: number | string) => {
		const number = Number(value)
		return ({
			toNumber: () => isNaN(number) ? value : number,
			toLeadingZero: () => {
				if (isNaN(number)) return value
				return number < 10 ? `0${number}` : `${number}`
			}
		})
	},
	string12hr: (string12hr: String12hr) => ({
		to24hr: (): String24hr => {
			if (/-/.test(string12hr)) return ''
			const isPM = is.PM.string12hr(string12hr)
			const timeResult = /^([0-9]{2})/.exec(string12hr)
			const hrs = timeResult ? parseInt(timeResult[1]) : 0
			let newHrs
			if (hrs === 12) {
				newHrs = isPM ? 12 : 0
			} else {
				newHrs = isPM ? hrs + 12 : hrs
			}
			const finalHrs = newHrs === 24 ? 0 : newHrs
			const timeRegEx = /^[0-9]{2}:([0-9]{2}) (AM|PM)/
			return string12hr.replace(timeRegEx, convert.thing(finalHrs).toLeadingZero() + ':$1')
		},
		toTimeObject: (): TimeObject => {
			const regEx = /^([0-9-]{1,2})\:([0-9-]{1,2})\s?(AM|PM|\-\-)?$/
			const result = regEx.exec(string12hr)
			const [hrs12, min, mode] = [<Hour12>convert.thing(result[1]).toNumber(), <Minute>convert.thing(result[2]).toNumber(), <Mode>result[3]]
			const hrs24 = <Hour24>(mode === 'PM' ? hrs12 + 12 : hrs12)

			return ({
				hrs24: hrs24 === 24 ? 0 : hrs24,
				hrs12,
				min,
				mode,
			})
		},
	}),
	string24hr: (string24hr: String24hr) => ({
		to12hr: (): String12hr => {
			if (string24hr === '') return '--:-- --'
			const [hrsString24, minString] = regex.string24hr.exec(string24hr)

			const hrs24 = <Hour24>convert.thing(hrsString24).toNumber()
			if (typeof hrs24 === 'number' && hrs24 > 24) {
				throw new Error('Hours cannot be higher than 24')
			}
			const min = <Hour24>convert.thing(minString).toNumber()
			const hrs12 = get.string24hr(string24hr).hrs12
			const mode = is.PM.hrs24(hrs24) ? 'PM' : 'AM'
			return convert.timeObject({ hrs24, hrs12, min, mode }).to12hr()
		},
		toTimeObject: (): TimeObject => {

			// string24hr
			const [, hrsString24, minString] = regex.string24hr.exec(string24hr)
			const [hrs24, min] = [
				<Hour24>convert.thing(hrsString24).toNumber(),
				<Minute>convert.thing(minString).toNumber()
			]

			return ({
				hrs24,
				hrs12: convert.hours24(hrs24).toHours12(),
				min,
				mode: is.AM.string24hr(string24hr) ? 'AM' : 'PM',
			})
		},
	}),
	timeObject: (timeObject: TimeObject) => {
		const { hrs24, hrs12, min, mode } = timeObject
		const hrsString24 = convert.thing(hrs24).toLeadingZero()
		const hrsString12 = convert.thing(hrs12).toLeadingZero()
		const minString = convert.thing(min).toLeadingZero()
		return ({
			to12hr: (): String12hr => [hrsString12, ':', minString, ' ', mode].join(''),
			to24hr: (): String24hr => [hrsString24, ':', minString].join(''),
		})
	},
	hours24: (hours24: Hour24) => ({
		toHours12: (): Hour12 =>
			<Hour12>(
				(hours24 <= 12 ? (hours24 === 0 ? 12 : hours24) : hours24 - 12)
			),
	}),
}
