import { Hour12, Minute, Mode, Segment, String12hr, TimeObject } from '../../types/index'

export type BlankFunc = () => void

export type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type GenericEntry = zeroToNine | 'a' | 'p' | string
export type GenericEntries = Array<GenericEntry>
export type NumericEntries = Array<zeroToNine>

export interface SegmentLogInterface {
	value: Hour12 | Minute | Mode
	segment: Segment
	entries: GenericEntries
	update?: BlankFunc
	limitHit?: BlankFunc
	add: (keyName: string) => void
	reset: BlankFunc
	clear: BlankFunc
}

export interface ManualEntryLogInterface {
	hrs12: SegmentLogInterface
	minutes: SegmentLogInterface
	mode: SegmentLogInterface
	fullValue12hr: String12hr
	update?: BlankFunc
	limitHit?: BlankFunc
}

export interface SegmentLogConstructor {
	startingValue: Hour12 | Minute | Mode
	segment: Segment
	onUpdate: BlankFunc
	onLimitHit: BlankFunc
}

export interface ManualEntryLogConstructor {
	/** The current Time object value */
	timeObject: TimeObject
	/** Callback function for when the values change */
	onUpdate?: (entryLog: ManualEntryLogInterface) => void
	/** Callback function for when the manual entry exceeds the maximum range */
	onLimitHit?: (entryLog: ManualEntryLogInterface) => void
}
