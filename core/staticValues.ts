import { Hour24, Hour12, Minute, SelectionRange, Segment, TimeObject, String12hr, String24hr } from '../types'

// TO DO: convert to new types format
export const ranges = {
	hrs12: <SelectionRange>{ start: 0, end: 2, segment: 'hrs12' },
	min: <SelectionRange>{ start: 3, end: 5, segment: 'min' },
	mode: <SelectionRange>{ start: 6, end: 8, segment: 'mode' },
}

// TO DO: convert to new types format
export const rangesList = Object.keys(ranges).map((key: Segment) => ranges[key])

// TO DO: convert to new types format
export const maxAndMins = {
	hrs24: { min: <Hour24>0, max: <Hour24>23 },
	hrs12: { min: <Hour12>1, max: <Hour12>12 },
	minutes: { min: <Minute>0, max: <Minute>59 },
}

export const segments: Array<Segment> = ['hrs12', 'min', 'mode']
