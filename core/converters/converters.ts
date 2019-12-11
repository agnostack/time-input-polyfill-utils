import { Hour } from '../../types'

export const convert_hours_to_12hr_time = (hours: Hour) =>
	hours <= 12 ? (hours === 0 ? 12 : hours) : hours - 12

export const convert_number = (number: any) =>
	isNaN(number) ? number : parseInt(number)

export const leading_zero = (number: any) => {
	if (isNaN(number)) return number
	const purified = parseInt(number)
	return purified < 10 ? `0${purified}` : `${purified}`
}

export const convert_to_12hr_time = (timeString_24hr: string) => {
	if (timeString_24hr === '') return '--:-- --'
	const twentyFour_regex = /([0-9]{1,2})\:([0-9]{2})/
	const result = twentyFour_regex.exec(timeString_24hr)
	const hrs_24 = convert_number(result[1])
	if (hrs_24 > 24) {
		throw new Error('Hours cannot be higher than 24')
	}
	const min = result[2]
	const hrs_12 = convert_hours_to_12hr_time(hrs_24)
	const isPM = 12 <= hrs_24 && hrs_24 < 24
	const mode = isPM ? 'PM' : 'AM'
	return [leading_zero(hrs_12), ':', min, ' ', mode].join('')
}

// Can't really test this one since it needs a node list as input which isn't possible in Node.js
export const toArray = (NodeList: NodeList) =>
	Array.prototype.slice.call(NodeList, 0)

export const convert_to_24hr_time = (timeString_12hr: string) => {
	if (/-/.test(timeString_12hr)) return ''
	const isPM = timeString_12hr.indexOf('PM') > -1
	const timeResult = /^([0-9]{2})/.exec(timeString_12hr)
	const hrs = timeResult ? parseInt(timeResult[1]) : 0
	let newHrs
	if (hrs === 12) {
		newHrs = isPM ? 12 : 0
	} else {
		newHrs = isPM ? hrs + 12 : hrs
	}
	const finalHrs = newHrs === 24 ? 0 : newHrs
	const timeRegEx = /^[0-9]{2}:([0-9]{2}) (AM|PM)/
	return timeString_12hr.replace(timeRegEx, leading_zero(finalHrs) + ':$1')
}
