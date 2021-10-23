import { MatchesTimeObject, ToArray, ToLeadingZero, ToNumber } from './utils.types'

export const toArray: ToArray = (NodeList) => Array.prototype.slice.call(NodeList, 0)

export const toNumber: ToNumber = (value) => {
	const number = Number(value)
	return isNaN(number) ? null : number
}

export const toLeadingZero: ToLeadingZero = (value) => {
	if (value === null) return '--'
	const number = Number(value)
	if (isNaN(number) && typeof value !== 'number') return value
	return number < 10 ? `0${number}` : `${number}`
}

export const matchesTimeObject: MatchesTimeObject = (timeObjA, timeObjB) => {
	return JSON.stringify(timeObjA) === JSON.stringify(timeObjB)
}
