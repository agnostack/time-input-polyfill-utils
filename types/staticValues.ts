import { SelectionRange, Hour24, Hour12, Minute } from './index'

export interface Ranges {
	hrs12: SelectionRange
	min: SelectionRange
	mode: SelectionRange
}

export interface MaxAndMins {
	hrs24: { min: Hour24; max: Hour24 }
	hrs12: { min: Hour12; max: Hour12 }
	minutes: { min: Minute; max: Minute }
}
