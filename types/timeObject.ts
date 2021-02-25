import { Hour12, Hour24, Minute, Mode } from './index'

export interface TimeObject {
	hrs24: Hour24
	hrs12: Hour12
	minutes: Minute
	mode: Mode
}

export interface PartialTimeObject {
	hrs24?: Hour24
	hrs12?: Hour12
	minutes?: Minute
	mode?: Mode
}

export type TimeObjectKey = keyof TimeObject
