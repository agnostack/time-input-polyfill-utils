import { TimeObject, Hour24, Minute } from '../../types'
import { convertString12hr, convertString24hr, convertTimeObject, convertHours24, convertDateObject } from '../convert/convert'
import { maxAndMins } from '../staticValues'
import { is } from '../is/is'
import { ModifierFunction, ModifyTimeString, Integration, ModifyString12hr, ModifyString24hr, ModifyTimeObject } from './modify.types'

const convert = {
	string12hr: convertString12hr,
	string24hr: convertString24hr,
}

const modifier: ModifierFunction = ({
	timeObject,
	action,
	target,
	integration,
	toHr,
}) => {
	const modifiedObject = modifyTimeObject(timeObject)[action][target][integration]()
	return convertTimeObject(modifiedObject)[toHr]()
}

const modifyTimeString: ModifyTimeString = ({
	timeString,
	format,
	action,
	target,
	integration
}) => {
	const timeObject = convert[format](timeString).toTimeObject()
	const toHr = format === 'string12hr' ? 'to12hr' : 'to24hr'
	return modifier({
		timeObject,
		toHr,
		target,
		action,
		integration,
	})
}

export const modifyString12hr: ModifyString12hr = (string12hr) => ({
	increment: {
		hours: {
			isolated: () => modifyTimeString({
				timeString: string12hr,
				format: 'string12hr',
				action: 'increment',
				target: 'hours',
				integration: 'isolated'
			}),
			integrated: () => modifyTimeString({
				timeString: string12hr,
				format: 'string12hr',
				action: 'increment',
				target: 'hours',
				integration: 'integrated'
			}),
		},
		minutes: {
			isolated: () => modifyTimeString({
				timeString: string12hr,
				format: 'string12hr',
				action: 'increment',
				target: 'minutes',
				integration: 'isolated'
			}),
			integrated: () => modifyTimeString({
				timeString: string12hr,
				format: 'string12hr',
				action: 'increment',
				target: 'minutes',
				integration: 'integrated'
			}),
		},
	},
	decrement: {
		hours: {
			isolated: () => modifyTimeString({
				timeString: string12hr,
				format: 'string12hr',
				action: 'decrement',
				target: 'hours',
				integration: 'isolated'
			}),
			integrated: () => modifyTimeString({
				timeString: string12hr,
				format: 'string12hr',
				action: 'decrement',
				target: 'hours',
				integration: 'integrated'
			}),
		},
		minutes: {
			isolated: () => modifyTimeString({
				timeString: string12hr,
				format: 'string12hr',
				action: 'decrement',
				target: 'minutes',
				integration: 'isolated'
			}),
			integrated: () => modifyTimeString({
				timeString: string12hr,
				format: 'string12hr',
				action: 'decrement',
				target: 'minutes',
				integration: 'integrated'
			}),
		},
	},
	toggleMode: () => {
		const timeObject = convertString12hr(string12hr).toTimeObject()
		const modified = modifyTimeObject(timeObject).toggleMode()
		return convertTimeObject(modified, true).to12hr()
	},
})
export const modifyString24hr: ModifyString24hr = (string24hr) => ({
	increment: {
		hours: {
			isolated: () => modifyTimeString({
				timeString: string24hr,
				format: 'string24hr',
				action: 'increment',
				target: 'hours',
				integration: 'isolated'
			}),
			integrated: () => modifyTimeString({
				timeString: string24hr,
				format: 'string24hr',
				action: 'increment',
				target: 'hours',
				integration: 'integrated'
			}),
		},
		minutes: {
			isolated: () => modifyTimeString({
				timeString: string24hr,
				format: 'string24hr',
				action: 'increment',
				target: 'minutes',
				integration: 'isolated'
			}),
			integrated: () => modifyTimeString({
				timeString: string24hr,
				format: 'string24hr',
				action: 'increment',
				target: 'minutes',
				integration: 'integrated'
			}),
		},
	},
	decrement: {
		hours: {
			isolated: () => modifyTimeString({
				timeString: string24hr,
				format: 'string24hr',
				action: 'decrement',
				target: 'hours',
				integration: 'isolated'
			}),
			integrated: () => modifyTimeString({
				timeString: string24hr,
				format: 'string24hr',
				action: 'decrement',
				target: 'hours',
				integration: 'integrated'
			}),
		},
		minutes: {
			isolated: () => modifyTimeString({
				timeString: string24hr,
				format: 'string24hr',
				action: 'decrement',
				target: 'minutes',
				integration: 'isolated'
			}),
			integrated: () => modifyTimeString({
				timeString: string24hr,
				format: 'string24hr',
				action: 'decrement',
				target: 'minutes',
				integration: 'integrated'
			}),
		},
	},
	toggleMode: () => {
		const timeObject = convertString24hr(string24hr).toTimeObject()
		const modified = modifyTimeObject(timeObject).toggleMode()
		return convertTimeObject(modified, true).to24hr()
	},
})
export const modifyTimeObject: ModifyTimeObject = (timeObject) => ({
	increment: {
		hours: {
			isolated: () => nudgeIsolatedTimeObjectHrs('up', timeObject),
			integrated: () => nudgeIntegratedTimeObjectHrs('up', timeObject),
		},
		minutes: {
			isolated: () => {
				const { min } = timeObject

				const newMin =
					min === maxAndMins.minutes.max
						? maxAndMins.minutes.min
						: nudgeMinutes(min, 'up')

				return {
					...timeObject,
					min: newMin,
				}
			},
			integrated: () => {
				const { min } = timeObject

				if (min === maxAndMins.minutes.max) {
					return nudgeIntegratedTimeObjectHrs('up', {
						...timeObject,
						min: maxAndMins.minutes.min,
					})
				}

				return {
					...timeObject,
					min: nudgeMinutes(min, 'up'),
				}
			},
		},
	},
	decrement: {
		hours: {
			isolated: () => nudgeIsolatedTimeObjectHrs('down', timeObject),
			integrated: () => nudgeIntegratedTimeObjectHrs('down', timeObject),
		},
		minutes: {
			isolated: () => {
				const { min } = timeObject

				const newMin =
					min === maxAndMins.minutes.min
						? maxAndMins.minutes.max
						: nudgeMinutes(min, 'down')

				return {
					...timeObject,
					min: newMin,
				}
			},
			integrated: () => {
				const { min } = timeObject

				if (min === maxAndMins.minutes.min) {
					return nudgeIntegratedTimeObjectHrs('down', {
						...timeObject,
						min: maxAndMins.minutes.max,
					})
				}

				return {
					...timeObject,
					min: nudgeMinutes(min, 'down'),
				}
			},
		},
	},
	toggleMode: () => {
		const { hrs12, mode } = timeObject

		let returnVal: TimeObject = { ...timeObject }

		const isAM = is.AM.timeObject(timeObject)

		let hrs24Calculation

		if (mode === '--') {
			const currentTimeMode = new Date().getHours() > 11 ? 'PM' : 'AM'
			returnVal.mode = currentTimeMode

			hrs24Calculation = hrs12 === 12
				? (isAM ? 0 : 12)
				: (isAM || hrs12 === '--' ? hrs12 : hrs12 + 12)
		} else {
			returnVal.mode = isAM ? 'PM' : 'AM'
			hrs24Calculation = hrs12 === 12
				? (isAM ? 12 : 0)
				: (isAM && hrs12 !== '--' ? hrs12 + 12 : hrs12)
		}

		returnVal.hrs24 = <Hour24>(hrs12 === '--' ? '--' : hrs24Calculation)

		if (hrs12 === '--' && mode === '--') {
			return returnVal
		}

		return straightenTimeObjectHrs('hrs24', returnVal)
	},
})

const nudgeMinutes = (minutes: Minute, direction: 'up' | 'down'): Minute => {
	const modifier = direction === 'up' ? 1 : -1
	return <Minute>(typeof minutes === 'string' ? new Date().getMinutes() : minutes + modifier)
}

const nudgeIsolatedTimeObjectHrs = (
	direction: 'up' | 'down',
	timeObject: TimeObject,
): TimeObject => {
	return nudgeTimeObjectHrs({
		direction,
		timeObject,
		integration: 'isolated',
		blankCallback: (copiedObject: TimeObject): TimeObject => {
			const currentHour24 = new Date().getHours()
			const currentHour12 = convertHours24(<Hour24>currentHour24).toHours12()

			if (currentHour24 > 12 && copiedObject.mode === 'AM') {
				copiedObject.hrs24 = currentHour12
			} else if (currentHour24 <= 12 && copiedObject.mode === 'PM') {
				copiedObject.hrs24 = <Hour24>(currentHour24 + 12)
			} else {
				copiedObject.hrs24 = <Hour24>currentHour24
			}

			copiedObject.hrs12 = currentHour12

			return copiedObject
		},
	})
}

const nudgeIntegratedTimeObjectHrs = (
	direction: 'up' | 'down',
	timeObject: TimeObject,
): TimeObject => {
	return nudgeTimeObjectHrs({
		direction,
		timeObject,
		integration: 'integrated',
		blankCallback: (copiedObject: TimeObject): TimeObject => {
			// If hours is blank, then it is better to increment in isolation
			return nudgeIsolatedTimeObjectHrs(direction, copiedObject)
		},
	})
}

const nudgeTimeObjectHrs = <T extends 'hrs12' | 'hrs24'>({
	direction,
	timeObject,
	integration,
	blankCallback,
}: {
	// nudging up or down?
	direction: 'up' | 'down'
	// the time object to modify
	timeObject: TimeObject
	// Do you want it to alter AM/PM?
	integration: Integration
	// A function to call if the hrs24 and hrs12 values start off as blank ("--")
	blankCallback: Function
}) => {
	const hrsType = <T>(integration === 'integrated' ? 'hrs24' : 'hrs12')
	const hrs = timeObject[hrsType]
	const copiedObject = { ...timeObject }

	const isUp = direction === 'up'

	const limit = isUp ? maxAndMins[hrsType].max : maxAndMins[hrsType].min
	const opposingLimit = isUp ? maxAndMins[hrsType].min : maxAndMins[hrsType].max
	const modifier = isUp ? 1 : -1

	if (typeof hrs === 'number') {
		if (hrs === limit) {
			copiedObject[hrsType] = <TimeObject[T]>opposingLimit
		} else {
			copiedObject[hrsType] = <TimeObject[T]>(<number>hrs + modifier)
		}
		return straightenTimeObjectHrs(hrsType, copiedObject)
	} else {
		return blankCallback(copiedObject)
	}
}

const straightenTimeObjectHrs = (basedOn: 'hrs12' | 'hrs24', invalidTimeObj: TimeObject) => {
	const use12hr = basedOn === 'hrs12'
	const toHr = use12hr ? 'to12hr' : 'to24hr'
	const format = use12hr ? 'string12hr' : 'string24hr'
	const timeString = convertTimeObject(invalidTimeObj, true)[toHr]()
	return convert[format](timeString).toTimeObject()
}
