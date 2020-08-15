import { SelectionRange, Segment, Ranges, MaxAndMins } from '../types/index'

export const ranges: Ranges = {
	hrs12: { start: 0, end: 2, segment: 'hrs12' },
	minutes: { start: 3, end: 5, segment: 'minutes' },
	mode: { start: 6, end: 8, segment: 'mode' },
}

export const rangesList: Array<SelectionRange> = [ranges.hrs12, ranges.minutes, ranges.mode]

export const maxAndMins: MaxAndMins = {
	hrs24: { minutes: 0, max: 23 },
	hrs12: { minutes: 1, max: 12 },
	minutes: { minutes: 0, max: 59 },
}

export const segments: Array<Segment> = ['hrs12', 'minutes', 'mode']
