import { Hour12, Hour24, Minute, Mode } from '.'

export interface TimeObject {
	hrs24: Hour24
	hrs12: Hour12
	min: Minute
	mode: Mode
}

export const TimeObjectKeys = Object.keys(<TimeObject>{ hrs24: 1, hrs12: 1, min: 0, mode: 'AM' })
