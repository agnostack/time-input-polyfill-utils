import { Segment } from '../../types'

export class manual_entry_log {
	hrs24: Array<number>
	hrs12: Array<number>
	min: Array<number>
	mode: Array<number>

	constructor() {
		Object.assign(this, {
			hrs24: [],
			hrs12: [],
			min: [],
			mode: [],
		})
	}

	clear(segment: Segment) {
		this[segment] = []
	}

	clearAll() {
		this.hrs24 = []
		this.hrs12 = []
		this.min = []
		this.mode = []
	}

	add(segment: Segment, entry: string) {
		this[segment] = [...this[segment], parseInt(entry)]
	}
}
