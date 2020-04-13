import { TimeObject, String12hr, String24hr } from '../../types/index'

export type Integration = 'isolated' | 'integrated'
export type Action = 'increment' | 'decrement'
export type Target = 'hrs12' | 'hrs24' | 'min' | 'mode'
export type ToHr = 'to12hr' | 'to24hr'

export interface ModifyString12hr {
	(string12hr: String12hr): {
		increment: {
			hrs12: {
				isolated: () => String12hr
				integrated: () => String12hr
			}
			min: {
				isolated: () => String12hr
				integrated: () => String12hr
			}
			mode: {
				isolated: () => String12hr
				integrated: () => String12hr
			}
			currentSegment: (
				$input: HTMLInputElement | null,
			) => {
				isolated: () => String12hr
				integrated: () => String12hr
			}
		}
		decrement: {
			hrs12: {
				isolated: () => String12hr
				integrated: () => String12hr
			}
			min: {
				isolated: () => String12hr
				integrated: () => String12hr
			}
			mode: {
				isolated: () => String12hr
				integrated: () => String12hr
			}
			currentSegment: (
				$input: HTMLInputElement | null,
			) => {
				isolated: () => String12hr
				integrated: () => String12hr
			}
		}
		toggleMode: () => String12hr
	}
}
export interface ModifyString24hr {
	(string24hr: String24hr): {
		increment: {
			hrs24: {
				isolated: () => String24hr
				integrated: () => String24hr
			}
			min: {
				isolated: () => String24hr
				integrated: () => String24hr
			}
			mode: {
				isolated: () => String24hr
				integrated: () => String24hr
			}
		}
		decrement: {
			hrs24: {
				isolated: () => String24hr
				integrated: () => String24hr
			}
			min: {
				isolated: () => String24hr
				integrated: () => String24hr
			}
			mode: {
				isolated: () => String24hr
				integrated: () => String24hr
			}
		}
		toggleMode: () => String24hr
	}
}
export interface ModifyTimeObject {
	(timeObject: TimeObject): {
		increment: {
			hrs12: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			}
			hrs24: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			}
			min: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			}
			mode: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			}
			currentSegment: (
				$input: HTMLInputElement | null,
			) => {
				isolated: () => TimeObject
				integrated: () => TimeObject
			}
		}
		decrement: {
			hrs12: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			}
			hrs24: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			}
			min: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			}
			mode: {
				isolated: () => TimeObject
				integrated: () => TimeObject
			}
			currentSegment: (
				$input: HTMLInputElement | null,
			) => {
				isolated: () => TimeObject
				integrated: () => TimeObject
			}
		}
		toggleMode: () => TimeObject
	}
}
