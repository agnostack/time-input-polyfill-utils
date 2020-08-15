import { Segment, Hour12, TimeObject, Minute, Mode, Hrs12, minutes } from '../../types/index'
import { maxAndMins } from '../staticValues'

class SegmentLog {
	value: Hour12 | Minute
	segment: Hrs12 | minutes
	entries: Array<number> = []

	constructor(startingValue: Hour12 | Minute, segment: Hrs12 | minutes) {
		this.value = startingValue
		this.segment = segment
	}

	add(value: string): void {
		const number = parseInt(value)
		if (!isNaN(number) && !(this.entries.length === 0 && number === 0)) {
			if ([0, 2].includes(this.entries.length)) {
				this.entries = [number]
			} else {
				const fullNumber = parseInt([...this.entries, number].join(''))
				const fullNumberGreaterThanMax = fullNumber > maxAndMins[this.segment].max

				if (fullNumberGreaterThanMax) {
					this.entries = [0, number]
				} else {
					this.entries.push(number)
				}
			}

			this.value = <Hour12 | Minute>parseInt(this.entries.join(''))
		}
	}

	reset(): void {
		this.entries = []
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
		super(startingValue, 'minutes')
		this.value = startingValue
	}
}

class SegmentLogMode {
	value: Mode
	entries: Array<string> = []

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
	}

	clear(): void {
		this.reset()
		this.value = '--'
	}
}

// Note: Due to this being a class, it does not need an interface
export class ManualEntryLog {
	hrs12: SegmentLogHrs
	minutes: SegmentLogMin
	mode: SegmentLogMode

	constructor(timeObject: TimeObject) {
		this.hrs12 = new SegmentLogHrs(timeObject.hrs12)
		this.minutes = new SegmentLogMin(timeObject.minutes)
		this.mode = new SegmentLogMode(timeObject.mode)
	}

	clear(segment: Segment): void {
		this[segment].reset()
	}

	clearAll(): void {
		this.hrs12.clear()
		this.minutes.clear()
		this.mode.clear()
	}

	add(segment: Segment, entry: string): void {
		this[segment].add(entry)
	}
}
