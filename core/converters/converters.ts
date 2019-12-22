import { Hour24, Hour12, Mode, Minute } from '../../types'
import { TimeObject } from '../../types/timeObject'
import { String24hr, String12hr, Dashes } from '../../types/strings'
import { is } from '../is/is'
import { regex } from '../regex/regex'
import { validate } from '../validate/validate'

export const toArray = (NodeList: NodeList) => Array.prototype.slice.call(NodeList, 0)

export const toNumber = (value: number | string | Dashes) => {
	const number = Number(value)
	return isNaN(number) ? value : number
}

export const toLeadingZero = (value: number | string | Dashes) => {
	const number = Number(value)
	if (isNaN(number)) return value
	return number < 10 ? `0${number}` : `${number}`
}

export const convert = {
	string12hr: (string12hr: String12hr) => {
		validate.string12hr(string12hr)
		return {
			to24hr: (): String24hr => {
				if (/-/.test(string12hr)) return ''
				const timeObject = convert.string12hr(string12hr).toTimeObject()
				return convert.timeObject(timeObject).to24hr()
			},
			toTimeObject: (): TimeObject => {
				const result = regex.string12hr.exec(string12hr)
				const [hrs12, min, mode] = [
					<Hour12>toNumber(result[1]),
					<Minute>toNumber(result[2]),
					<Mode>result[3],
				]
				const hrs24 = <Hour24>(
					(typeof hrs12 === 'number'
						? mode === 'PM'
							? hrs12 === 12
								? 12
								: hrs12 + 12 > 23
									? hrs12 + 12 - 24
									: hrs12 + 12
							: mode === 'AM' && hrs12 === 12
								? 0
								: hrs12
						: hrs12)
				)

				const timeObject: TimeObject = {
					hrs24,
					hrs12,
					min,
					mode,
				}

				validate.timeObject(timeObject)
				return timeObject
			},
		}
	},
	string24hr: (string24hr: String24hr) => {
		validate.string24hr(string24hr)
		return {
			to12hr: (): String12hr => {
				if (string24hr === '') return '--:-- --'
				const timeObject = convert.string24hr(string24hr).toTimeObject()
				return convert.timeObject(timeObject).to12hr()
			},
			toTimeObject: (): TimeObject => {
				if (string24hr === '') {
					return {
						hrs24: '--',
						hrs12: '--',
						min: '--',
						mode: '--',
					}
				}
				// string24hr
				const [, hrsString24, minString] = regex.string24hr.exec(string24hr)
				const [hrs24, min] = [<Hour24>toNumber(hrsString24), <Minute>toNumber(minString)]

				const timeObject: TimeObject = {
					hrs24,
					hrs12: convert.hours24(hrs24).toHours12(),
					min,
					mode: is.AM.string24hr(string24hr)
						? 'AM'
						: is.PM.string24hr(string24hr)
							? 'PM'
							: '--',
				}

				validate.timeObject(timeObject)
				return timeObject
			},
		}
	},
	timeObject: (timeObject: TimeObject) => {
		validate.timeObject(timeObject)
		const { hrs24, hrs12, min, mode } = timeObject
		const hrsString24 = toLeadingZero(hrs24)
		const hrsString12 = toLeadingZero(hrs12)
		const minString = toLeadingZero(min)
		return {
			to12hr: (): String12hr => [hrsString12, ':', minString, ' ', mode].join(''),
			to24hr: (): String24hr => {
				const string24hr = [hrsString24, ':', minString].join('')
				if (/-/.test(string24hr)) return ''
				return string24hr
			},
		}
	},
	hours24: (hours24: Hour24) => {
		validate.hours24(hours24)
		return {
			toHours12: (): Hour12 =>
				<Hour12>(
					(typeof hours24 === 'number'
						? hours24 <= 12
							? hours24 === 0
								? 12
								: hours24
							: hours24 - 12
						: hours24)
				),
		}
	},
}
