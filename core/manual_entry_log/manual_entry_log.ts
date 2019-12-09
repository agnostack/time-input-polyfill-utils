import { Segment } from '../../types/segment'

export class manual_entry_log {
	items: {
		hrs: Array<number>
		min: Array<number>
		mode: Array<number>
	}

	constructor() {
		this.items = {
			hrs: [],
			min: [],
			mode: [],
		}
	}

	clear(segment: Segment) {
		this.items[segment] = []
	}

	clearAll() {
		Object.keys(this.items).forEach((key: Segment) => {
			this.items[key] = []
		})
	}

	add(segment: Segment, entry: string) {
		this.items[segment] = [...this.items[segment], parseInt(entry)]
	}
}
