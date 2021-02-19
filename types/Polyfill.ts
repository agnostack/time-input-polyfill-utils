import { ToArray, ToNumber, ToLeadingZero, MatchesTimeObject } from '../core/utils/utils.types'
import { A11yClear, A11yCreate, A11yUpdate } from '../core/a11y/a11y.types'
import {
	ConvertString24hr,
	ConvertTimeObject,
	ConvertHours24,
	ConvertDateObject,
	ConvertString12hr,
} from '../core/convert/convert.types'
import { ManualEntryLog } from '../core/ManualEntryLog/ManualEntryLog'
import { ModifyString12hr, ModifyString24hr, ModifyTimeObject } from '../core/modify/modify.types'
import {
	QuerySelectAll,
	SelectSegment,
	SelectNextSegment,
	SelectPrevSegment,
	SelectCursorSegment,
} from '../core/select/select.types'
import {
	GetString24hr,
	GetString12hr,
	GetInputValue,
	GetLabelTextOf,
	GetRangeOf,
	GetAncestorsOf,
	GetCursorSegment,
	GetNextPrevSegment,
} from '../core/get/get.types'
import {
	IsPmHrs24,
	IsPmString12hr,
	IsPmString24hr,
	IsPmTimeObject,
	IsAmHrs24,
	IsAmString12hr,
	IsAmString24hr,
	IsAmTimeObject,
	IsTimeObject,
	IsString12hr,
	IsString24hr,
	IsShiftHeldDown,
} from '../core/is/is.types'
import {
	ValidateString12hr,
	ValidateString24hr,
	ValidateTimeObject,
	ValidateHours24,
} from '../core/validate/validate.types'
import { SelectionRange, Ranges, MaxAndMins, Segment } from './index'
import { Regex } from '../core/regex/regex.types'
import { Flash24hrTime } from '../core/flash24hrTime/flash24hrTime.types'

export interface Polyfill {
	a11yCreate: A11yCreate
	a11yUpdate: A11yUpdate
	a11yClear: A11yClear

	toArray: ToArray
	toNumber: ToNumber
	toLeadingZero: ToLeadingZero
	matchesTimeObject: MatchesTimeObject

	flash24hrTime: Flash24hrTime

	convertString12hr: ConvertString12hr
	convertString24hr: ConvertString24hr
	convertTimeObject: ConvertTimeObject
	convertHours24: ConvertHours24
	convertDateObject: ConvertDateObject

	getString12hr: GetString12hr
	getString24hr: GetString24hr
	getInputValue: GetInputValue
	getLabelTextOf: GetLabelTextOf
	getCursorSegment: GetCursorSegment
	getPrevSegment: GetNextPrevSegment
	getNextSegment: GetNextPrevSegment
	getRangeOf: GetRangeOf
	getAncestorsOf: GetAncestorsOf

	isShiftHeldDown: IsShiftHeldDown

	isPmHrs24: IsPmHrs24
	isPmString12hr: IsPmString12hr
	isPmString24hr: IsPmString24hr
	isPmTimeObject: IsPmTimeObject

	isAmHrs24: IsAmHrs24
	isAmString12hr: IsAmString12hr
	isAmString24hr: IsAmString24hr
	isAmTimeObject: IsAmTimeObject

	isTimeObject: IsTimeObject
	isString12hr: IsString12hr
	isString24hr: IsString24hr

	// I don't know why ES Lint thinks ManualEntryLog is undefined
	// eslint-disable-next-line no-undef
	ManualEntryLog: typeof ManualEntryLog

	modifyString12hr: ModifyString12hr
	modifyString24hr: ModifyString24hr
	modifyTimeObject: ModifyTimeObject

	regex: Regex

	_$$: QuerySelectAll

	selectSegment: SelectSegment
	selectNextSegment: SelectNextSegment
	selectPrevSegment: SelectPrevSegment
	selectCursorSegment: SelectCursorSegment

	validateString12hr: ValidateString12hr
	validateString24hr: ValidateString24hr
	validateTimeObject: ValidateTimeObject
	validateHours24: ValidateHours24

	ranges: Ranges
	rangesList: Array<SelectionRange>
	maxAndMins: MaxAndMins
	segments: Array<Segment>
}
