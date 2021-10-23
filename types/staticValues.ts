import { DefinedHour12, DefinedHour24, DefinedMinute, SelectionRange } from './index'

export interface Ranges {
	hrs12: SelectionRange
	minutes: SelectionRange
	mode: SelectionRange
}

export interface MaxAndMins {
	hrs24: { min: DefinedHour24; max: DefinedHour24 }
	hrs12: { min: DefinedHour12; max: DefinedHour12 }
	minutes: { min: DefinedMinute; max: DefinedMinute }
}
