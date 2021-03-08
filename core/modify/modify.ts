import { TimeObject, Hour24, Minute, String12hr, String24hr, Mode, Hour12 } from '../../types/index'
import {
	convertString12hr,
	convertString24hr,
	convertTimeObject,
} from '../convert/convert'
import { maxAndMins } from '../staticValues'
import { isAmTimeObject } from '../is/is'
import {
	Integration,
	ModifyString12hr,
	ModifyString24hr,
	ModifyTimeObject,
	Action,
} from './modify.types'
import { getCursorSegment } from '../get/get'
import { blankValues } from '../../common/blankValues'
import { validateTimeObject } from '../validate/validate'

export const modifyString12hr: ModifyString12hr = string12hr => {
	const modeToggle = {
		isolated: (): String12hr => modifyString12hr(string12hr).toggleMode(),
		integrated: (): String12hr => modifyString12hr(string12hr).toggleMode(),
	}
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const cursorSegmentModifier = (action: Action) => ($input: HTMLInputElement | null) => {
		const segment = getCursorSegment($input)
		return modifyString12hr(string12hr)[action][segment]
	}

	const modify = (
		modification: (timeObject: TimeObject) => TimeObject,
		skipValidation?: boolean | undefined,
	): String12hr => {
		const timeObject = convertString12hr(string12hr).toTimeObject()
		const modified = modification(timeObject)
		return convertTimeObject(modified, skipValidation).to12hr()
	}

	return {
		increment: {
			hrs12: {
				isolated: (): String12hr =>
					modify(timeObject => modifyTimeObject(timeObject).increment.hrs12.isolated()),
				integrated: (): String12hr =>
					modify(timeObject => modifyTimeObject(timeObject).increment.hrs12.integrated()),
			},
			minutes: {
				isolated: (): String12hr =>
					modify(timeObject => modifyTimeObject(timeObject).increment.minutes.isolated()),
				integrated: (): String12hr =>
					modify(timeObject =>
						modifyTimeObject(timeObject).increment.minutes.integrated(),
					),
			},
			mode: modeToggle,
			cursorSegment: cursorSegmentModifier('increment'),
		},
		decrement: {
			hrs12: {
				isolated: (): String12hr =>
					modify(timeObject => modifyTimeObject(timeObject).decrement.hrs12.isolated()),
				integrated: (): String12hr =>
					modify(timeObject => modifyTimeObject(timeObject).decrement.hrs12.integrated()),
			},
			minutes: {
				isolated: (): String12hr =>
					modify(timeObject => modifyTimeObject(timeObject).decrement.minutes.isolated()),
				integrated: (): String12hr =>
					modify(timeObject =>
						modifyTimeObject(timeObject).decrement.minutes.integrated(),
					),
			},
			mode: modeToggle,
			cursorSegment: cursorSegmentModifier('decrement'),
		},
		toggleMode: (): String12hr =>
			modify(timeObject => modifyTimeObject(timeObject).toggleMode(), true),

		clear: {
			hrs12: (): String12hr =>
				modify(timeObject => modifyTimeObject(timeObject).clear.hrs12()),
			minutes: (): String12hr =>
				modify(timeObject => modifyTimeObject(timeObject).clear.minutes()),
			mode: (): String12hr => modify(timeObject => modifyTimeObject(timeObject).clear.mode()),
			all: (): String12hr => modify(timeObject => modifyTimeObject(timeObject).clear.all()),
		},
	}
}
export const modifyString24hr: ModifyString24hr = string24hr => {
	const modeToggle = {
		isolated: (): String24hr => modifyString24hr(string24hr).toggleMode(),
		integrated: (): String24hr => modifyString24hr(string24hr).toggleMode(),
	}

	const modify = (
		modification: (timeObject: TimeObject) => TimeObject,
		skipValidation?: boolean | undefined,
	): String24hr => {
		const timeObject = convertString24hr(string24hr).toTimeObject()
		const modified = modification(timeObject)
		return convertTimeObject(modified, skipValidation).to24hr()
	}

	return {
		increment: {
			hrs24: {
				isolated: (): String24hr =>
					modify(timeObject => modifyTimeObject(timeObject).increment.hrs24.isolated()),
				integrated: (): String24hr =>
					modify(timeObject => modifyTimeObject(timeObject).increment.hrs24.integrated()),
			},
			minutes: {
				isolated: (): String24hr =>
					modify(timeObject => modifyTimeObject(timeObject).increment.minutes.isolated()),
				integrated: (): String24hr =>
					modify(timeObject =>
						modifyTimeObject(timeObject).increment.minutes.integrated(),
					),
			},
			mode: modeToggle,
		},
		decrement: {
			hrs24: {
				isolated: (): String24hr =>
					modify(timeObject => modifyTimeObject(timeObject).decrement.hrs24.isolated()),
				integrated: (): String24hr =>
					modify(timeObject => modifyTimeObject(timeObject).decrement.hrs24.integrated()),
			},
			minutes: {
				isolated: (): String24hr =>
					modify(timeObject => modifyTimeObject(timeObject).decrement.minutes.isolated()),
				integrated: (): String24hr =>
					modify(timeObject =>
						modifyTimeObject(timeObject).decrement.minutes.integrated(),
					),
			},
			mode: modeToggle,
		},
		toggleMode: (): String24hr =>
			modify(timeObject => modifyTimeObject(timeObject).toggleMode(), true),
	}
}
export const modifyTimeObject: ModifyTimeObject = timeObject => {
	const modeToggle = {
		isolated: (): TimeObject => modifyTimeObject(timeObject).toggleMode(),
		integrated: (): TimeObject => modifyTimeObject(timeObject).toggleMode(),
	}
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const cursorSegmentModifier = (action: Action) => ($input: HTMLInputElement | null) => {
		const segment = getCursorSegment($input)
		return modifyTimeObject(timeObject)[action][segment]
	}
	return {
		increment: {
			hrs12: {
				isolated: (): TimeObject => nudgeIsolatedTimeObjectHrs('up', timeObject),
				integrated: (): TimeObject => nudgeIntegratedTimeObjectHrs('up', timeObject),
			},
			// hrs24 is just an alias for hrs12 since the 24hr doesn't matter
			hrs24: {
				isolated: (): TimeObject => modifyTimeObject(timeObject).increment.hrs12.isolated(),
				integrated: (): TimeObject =>
					modifyTimeObject(timeObject).increment.hrs12.integrated(),
			},
			minutes: {
				isolated: (): TimeObject => {
					const { minutes } = timeObject

					const newMin =
						minutes === maxAndMins.minutes.max
							? maxAndMins.minutes.min
							: nudgeMinutes(minutes, 'up')

					return {
						...timeObject,
						minutes: newMin,
					}
				},
				integrated: (): TimeObject => {
					const { minutes } = timeObject

					if (minutes === maxAndMins.minutes.max) {
						return nudgeIntegratedTimeObjectHrs('up', {
							...timeObject,
							minutes: maxAndMins.minutes.min,
						})
					}

					return {
						...timeObject,
						minutes: nudgeMinutes(minutes, 'up'),
					}
				},
			},
			mode: modeToggle,
			cursorSegment: cursorSegmentModifier('increment'),
		},
		decrement: {
			hrs12: {
				isolated: (): TimeObject => nudgeIsolatedTimeObjectHrs('down', timeObject),
				integrated: (): TimeObject => nudgeIntegratedTimeObjectHrs('down', timeObject),
			},
			// hrs24 is just an alias for hrs12 since the 24hr doesn't matter
			hrs24: {
				isolated: (): TimeObject => modifyTimeObject(timeObject).decrement.hrs12.isolated(),
				integrated: (): TimeObject =>
					modifyTimeObject(timeObject).decrement.hrs12.integrated(),
			},
			minutes: {
				isolated: (): TimeObject => {
					const { minutes } = timeObject

					const newMin =
						minutes === maxAndMins.minutes.min
							? maxAndMins.minutes.max
							: nudgeMinutes(minutes, 'down')

					return {
						...timeObject,
						minutes: newMin,
					}
				},
				integrated: (): TimeObject => {
					const { minutes } = timeObject

					if (minutes === maxAndMins.minutes.min) {
						return nudgeIntegratedTimeObjectHrs('down', {
							...timeObject,
							minutes: maxAndMins.minutes.max,
						})
					}

					return {
						...timeObject,
						minutes: nudgeMinutes(minutes, 'down'),
					}
				},
			},
			mode: modeToggle,
			cursorSegment: cursorSegmentModifier('decrement'),
		},
		toggleMode: (): TimeObject => {
			const { hrs12, mode } = timeObject

			const returnVal: TimeObject = { ...timeObject }

			const isAM = isAmTimeObject(timeObject)

			const get24HrHours = (targetMode: Mode): Hour24 => {
				let hrs24Calculation: Hour24

				if (hrs12 === null) {
					hrs24Calculation = null
				} else {
					const is12 = hrs12 === 12
					const hours24hr = {
						am: is12 ? 0 : hrs12,
						pm: is12 ? 12 : hrs12 + 12,
					}
					hrs24Calculation = <Hour24>(targetMode === 'AM' ? hours24hr.am : hours24hr.pm)
				}

				return hrs24Calculation
			}

			if (mode === null) {
				returnVal.mode = 'AM'
				returnVal.hrs24 = <Hour24>get24HrHours('AM')
			} else {
				returnVal.mode = isAM ? 'PM' : 'AM'
				returnVal.hrs24 = <Hour24>get24HrHours(isAM ? 'PM' : 'AM')
			}

			if (hrs12 === null && mode === null) {
				return returnVal
			}

			return straightenTimeObject('hrs24', returnVal)
		},
		clear: {
			hrs24: (): TimeObject => ({ ...timeObject, hrs12: null, hrs24: null }),
			hrs12: (): TimeObject => ({ ...timeObject, hrs12: null, hrs24: null }),
			minutes: (): TimeObject => ({ ...timeObject, minutes: null }),
			mode: (): TimeObject => ({ ...timeObject, mode: null }),
			all: (): TimeObject => blankValues.timeObject,
		},
	}
}

const nudgeMinutes = (minutes: Minute, direction: 'up' | 'down'): Minute => {
	const modifier = direction === 'up' ? 1 : -1
	const newMinutes = direction === 'up' ? 0 : 59
	return <Minute>(minutes === null ? newMinutes : minutes + modifier)
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

			if (direction === 'up') {
				if (copiedObject.mode === 'PM') {
					copiedObject.hrs24 = 13
					copiedObject.hrs12 = 1
				} else {
					copiedObject.hrs24 = 1
					copiedObject.hrs12 = 1
				}
			} else {
				if (copiedObject.mode === 'PM') {
					copiedObject.hrs24 = 12
					copiedObject.hrs12 = 12
				} else {
					copiedObject.hrs24 = 0
					copiedObject.hrs12 = 12
				}
			}

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
}): TimeObject => {
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
		return straightenTimeObject(hrsType, copiedObject)
	} else {
		return blankCallback(straightenTimeObject(hrsType, copiedObject))
	}
}

const straightenTimeObject = (
	basedOn: 'hrs12' | 'hrs24',
	invalidTimeObj: TimeObject,
): TimeObject => {
	const { hrs24, hrs12, minutes } = invalidTimeObj

	const mode = straightenTimeObjectMode(basedOn, invalidTimeObj)
	const isAM = mode === 'AM'

	const use12hr = basedOn === 'hrs12'

	const get12hrBasedOn24hr = (): Hour12 => {
		let hr12 = <Hour12 | 0>(hrs24 !== null && hrs24 > 12 ? hrs24 - 12 : hrs24)
		if (hr12 === 0) {
			return 12
		}
		return hr12
	}
	const get24hrBasedOn12hr = (): Hour24 => {
		let hr24 = <Hour24 | 24>(!isAM && hrs12 !== null ? hrs12 + 12 : hrs12)

		if (hr24 === null) {
			return null
		}

		if (hr24 === 24) {
			return 0
		}

		if (hr24 >= 12 && isAM) {
			return <Hour24>(hr24 - 12)
		}

		return hr24
	}

	const newTimeObject: TimeObject = {
		hrs12: use12hr ? hrs12 : get12hrBasedOn24hr(),
		hrs24: use12hr ? get24hrBasedOn12hr() : hrs24,
		minutes,
		mode,
	}

	return newTimeObject
}

const straightenTimeObjectMode = (basedOn: 'hrs12' | 'hrs24', invalidTimeObj: TimeObject): Mode => {
	const { hrs24, mode } = invalidTimeObj
	if (mode === null) {
		return null
	}
	if (basedOn === 'hrs12') {
		return mode === null ? 'AM' : mode
	}

	return hrs24 && hrs24 > 11 ? 'PM' : 'AM'
}
