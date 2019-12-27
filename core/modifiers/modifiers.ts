import { TimeObject, String12hr, String24hr, Hour12, Hour24 } from '../../types'
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

		const incrementString12Hr_hrs = modifyString12hr_hrs('increment')
		const decrementString12Hr_hrs = modifyString12hr_hrs('decrement')

		return {
			increment: {
				hours: {
					isolated: (): String12hr => incrementString12Hr_hrs('isolated'),
					integrated: (): String12hr => incrementString12Hr_hrs('integrated'),
				},
				minutes: {
					isolated: (): String12hr => '12:00 AM',
					integrated: (): String12hr => '12:00 AM',
				},
			},
			decrement: {
				hours: {
					isolated: (): String12hr => decrementString12Hr_hrs('isolated'),
					integrated: (): String12hr => decrementString12Hr_hrs('integrated'),
				},
				minutes: {
					isolated: (): String12hr => '12:00 AM',
					integrated: (): String12hr => '12:00 AM',
				},
			},
		}
	},
	string24hr: (string24hr: String24hr) => {
		const modifyString24hr = modifyTimeString(string24hr, 'string24hr')

		const modifyString24hr_hrs = modifyString24hr('hours')

		const incrementString24Hr_hrs = modifyString24hr_hrs('increment')
		const decrementString24Hr_hrs = modifyString24hr_hrs('decrement')

		return {
			increment: {
				hours: {
					isolated: (): String24hr => incrementString24Hr_hrs('isolated'),
					integrated: (): String24hr => incrementString24Hr_hrs('integrated'),
				},
				minutes: {
					isolated: (): String24hr => '12:00',
					integrated: (): String24hr => '12:00',
				},
			},
			decrement: {
				hours: {
					isolated: (): String24hr => decrementString24Hr_hrs('isolated'),
					integrated: (): String24hr => decrementString24Hr_hrs('integrated'),
				},
				minutes: {
					isolated: (): String24hr => '12:00',
					integrated: (): String24hr => '12:00',
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
				isolated: (): TimeObject => ({ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' }),
				integrated: (): TimeObject => ({ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' }),
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
				integrated: (): TimeObject => {
					const { hrs24 } = timeObject
					const copiedObject = { ...timeObject }

					if (typeof hrs24 === 'number') {
						if (hrs24 === maxAndMins.hrs24.min) {
							copiedObject.hrs24 = maxAndMins.hrs24.max
						}

						if (hrs24 > maxAndMins.hrs24.min) {
							copiedObject.hrs24 = <Hour24>(hrs24 - 1)
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
				isolated: (): TimeObject => ({ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' }),
				integrated: (): TimeObject => ({ hrs24: 12, hrs12: 12, min: 0, mode: 'PM' }),
			},
		},
	}),
}
