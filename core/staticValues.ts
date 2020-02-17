import { Hour24, Hour12, Minute, SelectionRange, Segment, TimeObject, String12hr, String24hr } from '../types'

export const ranges = {
	hrs: <SelectionRange>{ start: 0, end: 2, segment: 'hrs' },
	min: <SelectionRange>{ start: 3, end: 5, segment: 'min' },
	mode: <SelectionRange>{ start: 6, end: 8, segment: 'mode' },
}

export const rangesList = Object.keys(ranges).map((key: Segment) => ranges[key])

export const maxAndMins = {
	hrs24: { min: <Hour24>0, max: <Hour24>23 },
	hrs12: { min: <Hour12>1, max: <Hour12>12 },
	minutes: { min: <Minute>0, max: <Minute>59 },
}

export const segments: Array<Segment> = ['hrs', 'min', 'mode']
