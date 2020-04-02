import { A11yCreate, A11yUpdate } from '../core/a11y/a11y.types'
import {
	ToArray,
	ToNumber,
	ToLeadingZero,
	ConvertString24hr,
	ConvertTimeObject,
	ConvertHours24,
	ConvertDateObject,
	ConvertString12hr,
} from '../core/convert/convert.types'
import { ManualEntryLog } from '../core/ManualEntryLog/ManualEntryLog'
import { ModifyString12hr, ModifyString24hr, ModifyTimeObject } from '../core/modify/modify.types'
import { QuerySelectAll } from '../core/select/select.types'
import {
	GetString24hr,
	GetString12hr,
	GetInputValue,
	GetLabelTextOf,
	GetRangeOf,
	GetAncestorsOf,
} from '../core/get/get.types'

declare global {
	interface Window {
		timeInputPolyfillUtils: {
			a11yCreate: A11yCreate
			a11yUpdate: A11yUpdate

			toArray: ToArray
			toNumber: ToNumber
			toLeadingZero: ToLeadingZero

			convertString12hr: ConvertString12hr
			convertString24hr: ConvertString24hr
			convertTimeObject: ConvertTimeObject
			convertHours24: ConvertHours24
			convertDateObject: ConvertDateObject

			getString12hr: GetString12hr
			getString24hr: GetString24hr
			getInputValue: GetInputValue
			getLabelTextOf: GetLabelTextOf
			getRangeOf: GetRangeOf
			getAncestorsOf: GetAncestorsOf

			// TO DO: is

			ManualEntryLog: typeof ManualEntryLog

			modifyString12hr: ModifyString12hr
			modifyString24hr: ModifyString24hr
			modifyTimeObject: ModifyTimeObject

			regex: {
				string12hr: RegExp
				string24hr: RegExp
			}

			_$$: QuerySelectAll

			// TO DO: select

			// TO DO: validate
		}
		supportsTime?: boolean
	}
}

// Needed for telling Typescript that this file can be imported
export default {}
