import { Hour24, Hour12, Minute } from '../types'

export const ranges = {
	hrs: { start: 0, end: 2 },
	min: { start: 3, end: 5 },
	mode: { start: 6, end: 8 },
}

export const maxAndMins = {
	hrs24: { min: <Hour24>0, max: <Hour24>23 },
	hrs12: { min: <Hour12>1, max: <Hour12>12 },
	minutes: { min: <Minute>0, max: <Minute>59 },
}

export const segments = Object.keys(ranges)
