import { SelectionRange, Hour24, Hour12, Minute } from './index'

export interface Ranges {
	hrs12: SelectionRange
	minutes: SelectionRange
	mode: SelectionRange
}

export interface MaxAndMins {
	hrs24: { minutes: Hour24; max: Hour24 }
	hrs12: { minutes: Hour12; max: Hour12 }
	minutes: { minutes: Minute; max: Minute }
}
