import { Hour24, Hour12, Minute, SelectionRange, Segment } from '../types'

export const ranges = {
	hrs: <SelectionRange>{ start: 0, end: 2, type: 'hrs' },
	min: <SelectionRange>{ start: 3, end: 5, type: 'min' },
	mode: <SelectionRange>{ start: 6, end: 8, type: 'mode' },
}

export const rangesList = [ranges.hrs, ranges.min, ranges.mode]
export const stringifiedRangesList = [ranges.hrs, ranges.min, ranges.mode].map(range => JSON.stringify(range))

export const maxAndMins = {
	hrs24: { min: <Hour24>0, max: <Hour24>23 },
	hrs12: { min: <Hour12>1, max: <Hour12>12 },
	minutes: { min: <Minute>0, max: <Minute>59 },
}

export const segments: Array<Segment> = ['hrs', 'min', 'mode']
