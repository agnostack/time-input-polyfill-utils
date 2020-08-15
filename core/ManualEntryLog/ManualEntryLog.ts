import { Segment, Hour12, TimeObject, Minute, Mode, Hrs12, Min } from '../../types/index'

class SegmentLog {
	value: Hour12 | Minute
	segment: Hrs12 | Min
	entries: Array<number> = []
	isFull = true

	constructor(startingValue: Hour12 | Minute, segment: Hrs12 | Min) {
		this.value = startingValue
		this.segment = segment
	}

	add(value: string): void {
		const number = parseInt(value)
		if (!isNaN(number)) {
			const value_x10_is_greater_than_max = {
				hrs12: number > 1,
				min: number > 5,
			}[this.segment]

			if (value_x10_is_greater_than_max) {
				this.entries = [0, number]
			} else {
				if (this.entries.length === 0) {
					this.entries = [number]
				}
				if (this.entries.length === 1) {
					this.entries.push(number)
				}
				if (this.entries.length === 2) {
					this.entries = [number]
				}
			}

			this.value = <Hour12 | Minute>parseInt(this.entries.join(''))
		}
	}

	reset(): void {
		this.entries = []
		this.isFull = true
	}

	clear(): void {
		this.reset()
		this.value = '--'
	}
}

class SegmentLogHrs extends SegmentLog {
	value: Hour12
	constructor(startingValue: Hour12) {
		super(startingValue, 'hrs12')
		this.value = startingValue
	}
}
class SegmentLogMin extends SegmentLog {
	value: Minute
	constructor(startingValue: Minute) {
		super(startingValue, 'min')
		this.value = startingValue
	}
}

class SegmentLogMode {
	value: Mode
	entries: Array<string> = []
	isFull = true

	constructor(startingValue: Mode) {
		this.value = startingValue
	}

	add(value: string): void {
		if (value.toLowerCase() === 'a') {
			this.value = 'AM'
			this.entries = [value]
		}
		if (value.toLowerCase() === 'p') {
			this.value = 'PM'
			this.entries = [value]
		}
	}

	reset(): void {
		this.entries = []
		this.isFull = true
	}

	clear(): void {
		this.reset()
		this.value = '--'
	}
}

// Note: Due to this being a class, it does not need an interface
export class ManualEntryLog {
	hrs12: SegmentLogHrs
	min: SegmentLogMin
	mode: SegmentLogMode

	constructor(timeObject: TimeObject) {
		this.hrs12 = new SegmentLogHrs(timeObject.hrs12)
		this.min = new SegmentLogMin(timeObject.min)
		this.mode = new SegmentLogMode(timeObject.mode)
	}

	clear(segment: Segment): void {
		this[segment].reset()
	}

	clearAll(): void {
		this.hrs12.clear()
		this.min.clear()
		this.mode.clear()
	}

	add(segment: Segment, entry: string): void {
		this[segment].add(entry)
	}
}
