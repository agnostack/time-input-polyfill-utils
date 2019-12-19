import { TimeObject, String12hr, String24hr, Hour12, Hour24 } from '../../types'
import { convert } from '../converters/converters'
import { maxAndMins } from '../staticValues'

type Integration = 'isolated' | 'integrated'

const modifier = ({
	timeObject,
	action,
	target,
	integration,
	toHr,
}: {
	timeObject: TimeObject
	action: 'increment' // | 'decrement'
	target: 'hours' // | 'minutes' | 'mode'
	integration: Integration
	toHr: 'to12hr' | 'to24hr'
}) => {
	const modifiedObject = modify.timeObject(timeObject)[action][target][integration]()
	return convert.timeObject(modifiedObject)[toHr]()
}

export const modify = {
	string12hr: (string12hr: String12hr) => {
		const timeObject = convert.string12hr(string12hr).toTimeObject()

		const incrementString12Hr_hrs = (integration: Integration) => {
			return modifier({
				timeObject,
				toHr: 'to12hr',
				target: 'hours',
				action: 'increment',
				integration,
			})
		}

		return {
			increment: {
				hours: {
					isolated: (): String12hr => incrementString12Hr_hrs('isolated'),
					integrated: (): String12hr => incrementString12Hr_hrs('integrated'),
				},
			},
		}
	},
	string24hr: (string24hr: String24hr) => {
		const timeObject = convert.string24hr(string24hr).toTimeObject()

		const incrementString24Hr_hrs = (integration: Integration) => {
			return modifier({
				timeObject,
				toHr: 'to24hr',
				target: 'hours',
				action: 'increment',
				integration,
			})
		}

		return {
			increment: {
				hours: {
					isolated: (): String24hr => incrementString24Hr_hrs('isolated'),
					integrated: (): String24hr => incrementString24Hr_hrs('integrated'),
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
					const newString12hr = convert.timeObject(copiedObject).to12hr()
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
						const newString24hr = convert.timeObject(copiedObject).to24hr()
						return convert.string24hr(newString24hr).toTimeObject()
					} else {
						// If it isn't a number, then it is better to increment in isolation
						return modify.timeObject(timeObject).increment.hours.isolated()
					}
				},
			},
		},
	}),
}
