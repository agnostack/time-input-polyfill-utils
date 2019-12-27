import { TimeObject, String12hr, String24hr, Hour12, Hour24, Minute } from '../../types'
import { convert } from '../converters/converters'
import { maxAndMins } from '../staticValues'

export type Integration = 'isolated' | 'integrated'
export type Action = 'increment' | 'decrement'
export type Target = 'hours' | 'minutes' // | 'mode'
export type ToHr = 'to12hr' | 'to24hr'

const modifier = ({
	timeObject,
	action,
	target,
	integration,
	toHr,
}: {
	timeObject: TimeObject
	action: Action
	target: Target
	integration: Integration
	toHr: ToHr
}) => {
	const modifiedObject = modify.timeObject(timeObject)[action][target][integration]()
	return convert.timeObject(modifiedObject)[toHr]()
}

const modifyTimeString = (
	timeString: String12hr | String24hr,
	format: 'string12hr' | 'string24hr',
) => {
	const timeObject = convert[format](timeString).toTimeObject()
	const toHr = format === 'string12hr' ? 'to12hr' : 'to24hr'

	return (target: Target) => {
		return (action: Action) => {
			return (integration: Integration) => {
				return modifier({
					timeObject,
					toHr,
					target,
					action,
					integration,
				})
			}
		}
	}
}

export const modify = {
	string12hr: (string12hr: String12hr) => {
		const modifyString12hr = modifyTimeString(string12hr, 'string12hr')

		const modifyString12hr_hrs = modifyString12hr('hours')
		const modifyString12hr_min = modifyString12hr('minutes')

		const incrementString12Hr_hrs = modifyString12hr_hrs('increment')
		const decrementString12Hr_hrs = modifyString12hr_hrs('decrement')

		const incrementString12Hr_min = modifyString12hr_min('increment')
		const decrementString12Hr_min = modifyString12hr_min('decrement')

		return {
			increment: {
				hours: {
					isolated: (): String12hr => incrementString12Hr_hrs('isolated'),
					integrated: (): String12hr => incrementString12Hr_hrs('integrated'),
				},
				minutes: {
					isolated: (): String12hr => incrementString12Hr_min('isolated'),
					integrated: (): String12hr => incrementString12Hr_min('integrated'),
				},
			},
			decrement: {
				hours: {
					isolated: (): String12hr => decrementString12Hr_hrs('isolated'),
					integrated: (): String12hr => decrementString12Hr_hrs('integrated'),
				},
				minutes: {
					isolated: (): String12hr => decrementString12Hr_min('isolated'),
					integrated: (): String12hr => decrementString12Hr_min('integrated'),
				},
			},
		}
	},
	string24hr: (string24hr: String24hr) => {
		const modifyString24hr = modifyTimeString(string24hr, 'string24hr')

		const modifyString24hr_hrs = modifyString24hr('hours')
		const modifyString24hr_min = modifyString24hr('minutes')

		const incrementString24Hr_hrs = modifyString24hr_hrs('increment')
		const decrementString24Hr_hrs = modifyString24hr_hrs('decrement')

		const incrementString24Hr_min = modifyString24hr_min('increment')
		const decrementString24Hr_min = modifyString24hr_min('decrement')

		return {
			increment: {
				hours: {
					isolated: (): String24hr => incrementString24Hr_hrs('isolated'),
					integrated: (): String24hr => incrementString24Hr_hrs('integrated'),
				},
				minutes: {
					isolated: (): String24hr => incrementString24Hr_min('isolated'),
					integrated: (): String24hr => incrementString24Hr_min('integrated'),
				},
			},
			decrement: {
				hours: {
					isolated: (): String24hr => decrementString24Hr_hrs('isolated'),
					integrated: (): String24hr => decrementString24Hr_hrs('integrated'),
				},
				minutes: {
					isolated: (): String24hr => decrementString24Hr_min('isolated'),
					integrated: (): String24hr => decrementString24Hr_min('integrated'),
				},
			},
		}
	},
	timeObject: (timeObject: TimeObject) => ({
		increment: {
			hours: {
				isolated: (): TimeObject => {
					const { hrs12 } = timeObject
					const copiedObject = { ...timeObject }

					if (typeof hrs12 === 'number') {
						if (hrs12 === 11) {
							copiedObject.hrs12 = 12
						} else {
							if (hrs12 === maxAndMins.hrs12.max) {
								copiedObject.hrs12 = maxAndMins.hrs12.min
							}

							if (hrs12 < maxAndMins.hrs12.max) {
								copiedObject.hrs12 = <Hour12>(hrs12 + 1)
							}
						}
					} else {
						const hr24CurrentHrs = <Hour24>new Date().getHours()
						copiedObject.hrs12 = convert.hours24(hr24CurrentHrs).toHours12()
					}

					// This aligns the hrs24 value with the hrs12 value
					const newString12hr = convert.timeObject(copiedObject, true).to12hr()
					return convert.string12hr(newString12hr).toTimeObject()
				},
				integrated: (): TimeObject => {
					const { hrs24 } = timeObject
					const copiedObject = { ...timeObject }

					if (typeof hrs24 === 'number') {
						if (hrs24 === maxAndMins.hrs24.max) {
							copiedObject.hrs24 = maxAndMins.hrs24.min
						}

						if (hrs24 < maxAndMins.hrs24.max) {
							copiedObject.hrs24 = <Hour24>(hrs24 + 1)
						}

						// This aligns the hrs12 value with the hrs24 value
						const newString24hr = convert.timeObject(copiedObject, true).to24hr()
						return convert.string24hr(newString24hr).toTimeObject()
					} else {
						// If it isn't a number, then it is better to increment in isolation
						return modify.timeObject(timeObject).increment.hours.isolated()
					}
				},
			},
			minutes: {
				isolated: (): TimeObject => {
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
				integrated: (): TimeObject => {
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
				isolated: (): TimeObject => {
					const { hrs12 } = timeObject
					const copiedObject = { ...timeObject }

					if (typeof hrs12 === 'number') {
						if (hrs12 === 12) {
							copiedObject.hrs12 = 11
						} else {
							if (hrs12 === maxAndMins.hrs12.min) {
								copiedObject.hrs12 = maxAndMins.hrs12.max
							}

							if (hrs12 > maxAndMins.hrs12.min) {
								copiedObject.hrs12 = <Hour12>(hrs12 - 1)
							}
						}
					} else {
						const hr24CurrentHrs = <Hour24>new Date().getHours()
						copiedObject.hrs12 = convert.hours24(hr24CurrentHrs).toHours12()
					}

					// This aligns the hrs24 value with the hrs12 value
					const newString12hr = convert.timeObject(copiedObject, true).to12hr()
					return convert.string12hr(newString12hr).toTimeObject()
				},
				integrated: (): TimeObject => nudgeIntegratedTimeObjectHrs('down', timeObject),
			},
			minutes: {
				isolated: (): TimeObject => ({ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' }),
				integrated: (): TimeObject => ({ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' }),
			},
		},
	}),
}

const nudgeMinutes = (minutes: Minute, direction: 'up' | 'down'): Minute => {
	return <Minute>(typeof minutes === 'string' ? new Date().getMinutes() : minutes + 1)
}

const nudgeIntegratedTimeObjectHrs = (
	direction: 'up' | 'down',
	timeObject: TimeObject,
): TimeObject => {
	const { hrs24 } = timeObject
	let copiedObject = { ...timeObject }

	const modifier = direction === 'up' ? 1 : -1
	const limit = direction === 'up' ? maxAndMins.hrs24.max : maxAndMins.hrs24.min
	const opposingLimit = direction === 'up' ? maxAndMins.hrs24.min : maxAndMins.hrs24.max

	if (typeof hrs24 === 'number') {
		if (hrs24 === limit) {
			copiedObject.hrs24 = opposingLimit
		} else if (hrs24 === opposingLimit) {
			copiedObject.hrs24 = limit
		} else {
			copiedObject.hrs24 = <Hour24>(hrs24 + modifier)
		}

		// This aligns the hrs12 value with the hrs24 value
		const newString24hr = convert.timeObject(copiedObject, true).to24hr()
		return convert.string24hr(newString24hr).toTimeObject()
	} else {
		// If it isn't a number, then it is better to increment in isolation
		return modify.timeObject(timeObject).increment.hours.isolated()
	}
}
