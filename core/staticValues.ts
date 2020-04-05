import { SelectionRange, Segment, Ranges, MaxAndMins } from '../types/index'

export const ranges: Ranges = {
	hrs12: { start: 0, end: 2, segment: 'hrs12' },
	min: { start: 3, end: 5, segment: 'min' },
	mode: { start: 6, end: 8, segment: 'mode' },
}

export const rangesList: Array<SelectionRange> = [ranges.hrs12, ranges.min, ranges.mode]

// TO DO: convert to new types format
export const maxAndMins: MaxAndMins = {
	hrs24: { min: 0, max: 23 },
	hrs12: { min: 1, max: 12 },
	minutes: { min: 0, max: 59 },
}

export const segments: Array<Segment> = ['hrs12', 'min', 'mode']
