import { Hour24, Hour12 } from '../../types'
import { TimeObject } from '../../types/timeObject'

export const convert_number = (number: any) =>
	isNaN(number) ? number : parseInt(number)

export const leading_zero = (number: any) => {
	if (isNaN(number)) return number
	const purified = parseInt(number)
	return purified < 10 ? `0${purified}` : `${purified}`
}

// Can't really test this one since it needs a node list as input which isn't possible in Node.js
export const toArray = (NodeList: NodeList) =>
	Array.prototype.slice.call(NodeList, 0)

export const convert = {
	string12hr: (string12hr: string) => ({
		to24hr: (): string => {
			if (/-/.test(string12hr)) return ''
			const isPM = string12hr.indexOf('PM') > -1
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
			return string12hr.replace(timeRegEx, leading_zero(finalHrs) + ':$1')
		},
		toTimeObject: (): TimeObject => ({
			hrs: 1,
			min: 0,
			mode: 'AM',
		}),
	}),
	string24hr: (string24hr: string) => ({
		to12hr: (): string => {
			if (string24hr === '') return '--:-- --'
			const twentyFour_regex = /([0-9]{1,2})\:([0-9]{2})/
			const result = twentyFour_regex.exec(string24hr)
			const hrs_24 = convert_number(result[1])
			if (hrs_24 > 24) {
				throw new Error('Hours cannot be higher than 24')
			}
			const min = result[2]
			const hrs_12 = convert.hours24(hrs_24).toHours12()
			const isPM = 12 <= hrs_24 && hrs_24 < 24
			const mode = isPM ? 'PM' : 'AM'
			return [leading_zero(hrs_12), ':', min, ' ', mode].join('')
		},
		toTimeObject: (): TimeObject => ({
			hrs: 1,
			min: 0,
			mode: 'AM',
		}),
	}),
	timeObject: (timeObject: TimeObject) => ({
		to12hr: (): string => '01:00 AM',
		to24hr: () => '01:00',
	}),
	hours24: (hours24: Hour24) => ({
		toHours12: (): Hour12 =>
			<Hour12>(
				(hours24 <= 12 ? (hours24 === 0 ? 12 : hours24) : hours24 - 12)
			),
	}),
}
