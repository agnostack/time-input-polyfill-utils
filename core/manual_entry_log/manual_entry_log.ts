import { Segment } from '../../types'

// Note: Due to this being a class, it does not need an interface
export class manual_entry_log {
	hrs12: Array<number | string> = []
	min: Array<number | string> = []
	mode: Array<number | string> = []

	clear(segment: Segment): void {
		this[segment] = []
	}

	clearAll(): void {
		this.hrs12 = []
		this.min = []
		this.mode = []
	}

	add(segment: Segment, entry: number | string): void {
		this[segment].push(entry)
	}
}
