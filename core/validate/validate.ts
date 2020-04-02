import { TimeObject } from '../../types/timeObject'
import { String24hr, String12hr } from '../../types/strings'
import { isString12hr, isString24hr, isTimeObject } from '../is/is'
import { Hour24 } from '../../types'

const writeBadValue = (badValue: any): any =>
	typeof badValue === 'string' ? `"${badValue}"` : badValue

// TO DO: convert to new types format
export const validate = {
	string12hr: (string12hr: String12hr): boolean => {
		if (!isString12hr(string12hr)) {
			throw new Error(
				`"${string12hr}" is not a valid 12 hour time, use the format "HH:MM AM/PM"`,
			)
		}
		return true
	},
	string24hr: (string24hr: String24hr): boolean => {
		if (!isString24hr(string24hr)) {
			const extra =
				(/-/.test(string24hr) &&
					' Use an empty string instead of "--:--" to represent a blank value') ||
				(/24:\d\d/.test(string24hr) && ' Use "00" instead of "24".') ||
				''
			throw new Error(`"${string24hr}" is not a valid 24 hour time.${extra}`)
		}
		return true
	},
	timeObject: (timeObject: TimeObject): boolean => {
		const { hrs24, hrs12, min, mode } = timeObject
		if (!isTimeObject(timeObject)) {
			throw new Error(
				`${JSON.stringify(
					timeObject,
				)} is not a valid time object. Must be in the format {hrs24: 0, hrs12: 12, min: 0, mode: 'AM'} (12:00 AM)`,
			)
		}

		const isValid = (variable: any, varName: string, lower: number, upper: number): void => {
			if (
				(typeof variable === 'string' && variable !== '--') ||
				(typeof variable === 'number' && (variable > upper || variable < lower))
			) {
				const badValue = writeBadValue(variable)
				throw new Error(
					`${varName} (${badValue}) is invalid, "${varName}" must be a number ${lower}-${upper} or "--"`,
				)
			}
		}
		isValid(hrs24, 'hrs24', 0, 23)
		isValid(hrs12, 'hrs12', 1, 12)
		isValid(min, 'min', 0, 59)

		const validModes = ['AM', 'PM', '--']

		if (validModes.indexOf(mode) < 0) {
			throw new Error(
				`Mode (${writeBadValue(mode)}) is invalid. Valid values are: ${validModes.map(val =>
					writeBadValue(val),
				)}`,
			)
		}

		if (
			(hrs24 === 0 && hrs12 !== 12) ||
			(hrs12 !== hrs24 && hrs24 < 13 && hrs24 !== 0) ||
			(typeof hrs24 === 'number' && hrs24 > 12 && hrs12 !== hrs24 - 12)
		) {
			throw new Error(
				`hrs12 (${hrs12}) should be equal to or 12 hours behind hrs24 (${hrs24})`,
			)
		}

		if (mode !== '--' && ((hrs24 >= 12 && mode !== 'PM') || (hrs24 <= 11 && mode !== 'AM'))) {
			if (mode === 'PM') {
				throw new Error(
					`If mode (${mode}) is "PM", hrs24 (${hrs24}) should be greater than or equal to 12`,
				)
			} else {
				throw new Error(
					`If mode (${mode}) is "AM", hrs24 (${hrs24}) should be less than or equal to 11`,
				)
			}
		}

		return true
	},
	hours24: (hrs24: Hour24): void => {
		if (
			(typeof hrs24 !== 'number' && hrs24 !== '--') ||
			(typeof hrs24 === 'number' && (hrs24 < 0 || hrs24 > 23))
		) {
			throw new Error(
				`"${hrs24}" must be a number between 0 and 23 or "--", use 0 instead of 24`,
			)
		}
	},
}
