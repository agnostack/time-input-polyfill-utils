import { Segment } from '../../types/segment'

export class manual_entry_log {
	hrs: Array<number>
	min: Array<number>
	mode: Array<number>

	constructor() {
		Object.assign(this, {
			hrs: [],
			min: [],
			mode: [],
		})
	}

	clear(segment: Segment) {
		this[segment] = []
	}

	clearAll() {
		this.hrs = []
		this.min = []
		this.mode = []
	}

	add(segment: Segment, entry: string) {
		this[segment] = [...this[segment], parseInt(entry)]
	}
}
