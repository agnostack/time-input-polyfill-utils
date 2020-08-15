import { TimeObject, Hour24, Minute, String12hr, String24hr, Mode, Hour12 } from '../../types/index'
import {
	convertString12hr,
	convertString24hr,
	convertTimeObject,
	convertHours24,
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

const convert = {
	string12hr: convertString12hr,
	string24hr: convertString24hr,
}

const getCurrentTimeMode = (): Mode => (new Date().getHours() > 11 ? 'PM' : 'AM')

type GetCurrentHours = {
	currentHour12: Hour12
	currentHour24: Hour24
}

const getCurrentHours = (): GetCurrentHours => {
	const currentHour24 = <Hour24>new Date().getHours()
	const currentHour12 = convertHours24(currentHour24).toHours12()
	return { currentHour12, currentHour24 }
}

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

				if (hrs12 === '--') {
					hrs24Calculation = '--'
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

			if (mode === '--') {
				const currentTimeMode = getCurrentTimeMode()
				returnVal.mode = currentTimeMode
				returnVal.hrs24 = <Hour24>get24HrHours(currentTimeMode)
			} else {
				returnVal.mode = isAM ? 'PM' : 'AM'
				returnVal.hrs24 = <Hour24>get24HrHours(isAM ? 'PM' : 'AM')
			}

			if (hrs12 === '--' && mode === '--') {
				return returnVal
			}

			return straightenTimeObject('hrs24', returnVal)
		},
		clear: {
			hrs24: (): TimeObject => ({ ...timeObject, hrs12: '--', hrs24: '--' }),
			hrs12: (): TimeObject => ({ ...timeObject, hrs12: '--', hrs24: '--' }),
			minutes: (): TimeObject => ({ ...timeObject, minutes: '--' }),
			mode: (): TimeObject => ({ ...timeObject, mode: '--' }),
			all: (): TimeObject => blankValues.timeObject,
		},
	}
}

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
			const { currentHour24, currentHour12 } = getCurrentHours()

			if (typeof currentHour24 === 'number') {
				if (currentHour24 > 12 && copiedObject.mode === 'AM') {
					copiedObject.hrs24 = currentHour12
				} else if (currentHour24 <= 12 && copiedObject.mode === 'PM') {
					copiedObject.hrs24 = <Hour24>(currentHour24 + 12)
				} else {
					copiedObject.hrs24 = <Hour24>currentHour24
				}

				copiedObject.hrs12 = currentHour12
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
		return blankCallback(copiedObject)
	}
}

const straightenTimeObject = (
	basedOn: 'hrs12' | 'hrs24',
	invalidTimeObj: TimeObject,
): TimeObject => {
	const { minutes } = invalidTimeObj

	const mode = straightenTimeObjectMode(basedOn, invalidTimeObj)

	const use12hr = basedOn === 'hrs12'
	const toHr = use12hr ? 'to12hr' : 'to24hr'
	const format = use12hr ? 'string12hr' : 'string24hr'

	const preFilledTimeObject: TimeObject = {
		...invalidTimeObj,
		minutes: 0,
		mode,
	}

	const timeString = convertTimeObject(preFilledTimeObject, true)[toHr]()

	const { hrs12, hrs24 } = convert[format](timeString).toTimeObject()

	return { hrs12, hrs24, minutes, mode }
}

const straightenTimeObjectMode = (basedOn: 'hrs12' | 'hrs24', invalidTimeObj: TimeObject): Mode => {
	const { hrs24, mode } = invalidTimeObj
	if (mode === '--') {
		return getCurrentTimeMode()
	}
	if (basedOn === 'hrs12') {
		return mode
	}

	return hrs24 > 11 ? 'PM' : 'AM'
}
