import { Hour12, Hour24, Minute, Mode } from './index'

export interface TimeObject {
	hrs24: Hour24
	hrs12: Hour12
	min: Minute
	mode: Mode
}

export const TimeObjectKeys = ['hrs24', 'hrs12', 'min', 'mode']
