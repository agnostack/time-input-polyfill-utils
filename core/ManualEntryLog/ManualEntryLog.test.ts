import { ManualEntryLog } from './ManualEntryLog'

const startingFullValue = '12:30 AM'

const createEntryLog = (): ManualEntryLog =>
	new ManualEntryLog({ hrs12: 12, hrs24: 0, minutes: 30, mode: 'AM' })

describe('Initialize', () => {
	it('hrs12', () => {
		const entryLog = createEntryLog()
		expect(entryLog.hrs12.entries).to.deep.equal([])
		expect(entryLog.hrs12.value).to.equal(12)
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
	it('minutes', () => {
		const entryLog = createEntryLog()
		expect(entryLog.minutes.entries).to.deep.equal([])
		expect(entryLog.minutes.value).to.equal(30)
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		expect(entryLog.mode.value).to.equal('AM')
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
})

describe('Add "1"', () => {
	it('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		expect(entryLog.hrs12.entries).to.deep.equal([1])
		expect(entryLog.hrs12.value).to.equal(1)
		expect(entryLog.fullValue12hr).to.equal('01:30 AM')
	})
	it('minutes', () => {
		const entryLog = createEntryLog()
		entryLog.minutes.add('1')
		expect(entryLog.minutes.entries).to.deep.equal([1])
		expect(entryLog.minutes.value).to.equal(1)
		expect(entryLog.fullValue12hr).to.equal('12:01 AM')
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('1')
		expect(entryLog.mode.value).to.equal('AM') // expect no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
})

describe('Add "1" > add "2"', () => {
	it('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		entryLog.hrs12.add('2')
		expect(entryLog.hrs12.entries).to.deep.equal([1, 2])
		expect(entryLog.hrs12.value).to.equal(12)
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
	it('minutes', () => {
		const entryLog = createEntryLog()
		entryLog.minutes.add('1')
		entryLog.minutes.add('2')
		expect(entryLog.minutes.entries).to.deep.equal([1, 2])
		expect(entryLog.minutes.value).to.equal(12)
		expect(entryLog.fullValue12hr).to.equal('12:12 AM')
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('1')
		entryLog.mode.add('2')
		expect(entryLog.mode.value).to.equal('AM') // expect no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
})

describe('Add "1" > add "2" > add "3"', () => {
	it('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		entryLog.hrs12.add('2')
		entryLog.hrs12.add('3')
		expect(entryLog.hrs12.entries).to.deep.equal([3])
		expect(entryLog.hrs12.value).to.equal(3)
		expect(entryLog.fullValue12hr).to.equal('03:30 AM')
	})
	it('minutes', () => {
		const entryLog = createEntryLog()
		entryLog.minutes.add('1')
		entryLog.minutes.add('2')
		entryLog.minutes.add('3')
		expect(entryLog.minutes.entries).to.deep.equal([3])
		expect(entryLog.minutes.value).to.equal(3)
		expect(entryLog.fullValue12hr).to.equal('12:03 AM')
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('1')
		entryLog.mode.add('2')
		entryLog.mode.add('3')
		expect(entryLog.mode.value).to.equal('AM') // expect no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
})

describe('Add "1" > add "2" > add "3" > add "4"', () => {
	it('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		entryLog.hrs12.add('2')
		entryLog.hrs12.add('3')
		entryLog.hrs12.add('4')
		expect(entryLog.hrs12.entries).to.deep.equal([0, 4])
		expect(entryLog.hrs12.value).to.equal(4)
		expect(entryLog.fullValue12hr).to.equal('04:30 AM')
	})
	it('minutes', () => {
		const entryLog = createEntryLog()
		entryLog.minutes.add('1')
		entryLog.minutes.add('2')
		entryLog.minutes.add('3')
		entryLog.minutes.add('4')
		expect(entryLog.minutes.entries).to.deep.equal([3, 4])
		expect(entryLog.minutes.value).to.equal(34)
		expect(entryLog.fullValue12hr).to.equal('12:34 AM')
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('1')
		entryLog.mode.add('2')
		entryLog.mode.add('3')
		entryLog.mode.add('4')
		expect(entryLog.mode.value).to.equal('AM') // expect no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
})

describe('Add "0" expect no change', () => {
	it('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('0')
		expect(entryLog.hrs12.entries).to.deep.equal([])
		expect(entryLog.hrs12.value).to.equal(12) // no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
	it('minutes', () => {
		const entryLog = createEntryLog()
		entryLog.minutes.add('0')
		expect(entryLog.minutes.entries).to.deep.equal([])
		expect(entryLog.minutes.value).to.equal(30) // no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('0')
		expect(entryLog.mode.value).to.equal('AM') // expect no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
})
describe('Add "1" > add "0"', () => {
	it('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		entryLog.hrs12.add('0')
		expect(entryLog.hrs12.entries).to.deep.equal([1, 0])
		expect(entryLog.hrs12.value).to.equal(10)
		expect(entryLog.fullValue12hr).to.equal('10:30 AM')
	})
	it('minutes', () => {
		const entryLog = createEntryLog()
		entryLog.minutes.add('1')
		entryLog.minutes.add('0')
		expect(entryLog.minutes.entries).to.deep.equal([1, 0])
		expect(entryLog.minutes.value).to.equal(10)
		expect(entryLog.fullValue12hr).to.equal('12:10 AM')
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('1')
		entryLog.mode.add('0')
		expect(entryLog.mode.value).to.equal('AM') // expect no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
})

// reset is needed for things like typing "1" then leaving then coming back
// The the tracker should reset if they are returning
describe('Add "1"/"p" > then reset', () => {
	it('hrs12 add "1" > reset', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		entryLog.hrs12.reset()
		// I don't want to lose the value, just reset the entries array
		expect(entryLog.hrs12.entries).to.deep.equal([])
		expect(entryLog.hrs12.value).to.equal(1)
		expect(entryLog.fullValue12hr).to.equal('01:30 AM')
	})
	it('minutes add "1" > reset', () => {
		const entryLog = createEntryLog()
		entryLog.minutes.add('1')
		entryLog.minutes.reset()
		expect(entryLog.minutes.entries).to.deep.equal([])
		expect(entryLog.minutes.value).to.equal(1)
		expect(entryLog.fullValue12hr).to.equal('12:01 AM')
	})
	it('mode add "p" > reset', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('p')
		entryLog.mode.reset() // reset doesn't really do anything for mode it's just there to prevent errors
		expect(entryLog.mode.value).to.equal('PM')
		expect(entryLog.fullValue12hr).to.equal('12:30 PM')
	})
})

describe('Add "1"/"p" > then clear', () => {
	it('hrs12 add "1" > clear', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		entryLog.hrs12.clear()
		expect(entryLog.hrs12.entries).to.deep.equal([])
		expect(entryLog.hrs12.value).to.equal('--')
		expect(entryLog.fullValue12hr).to.equal('--:30 AM')
	})
	it('minutes add "1" > clear', () => {
		const entryLog = createEntryLog()
		entryLog.minutes.add('1')
		entryLog.minutes.clear()
		expect(entryLog.minutes.entries).to.deep.equal([])
		expect(entryLog.minutes.value).to.equal('--')
		expect(entryLog.fullValue12hr).to.equal('12:-- AM')
	})
	it('mode add "p" > clear', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('p')
		entryLog.mode.clear()
		expect(entryLog.mode.entries).to.deep.equal([])
		expect(entryLog.mode.value).to.equal('--')
		expect(entryLog.fullValue12hr).to.equal('12:30 --')
	})
})

describe('Add "p"', () => {
	it('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('p')
		expect(entryLog.hrs12.entries).to.deep.equal([])
		expect(entryLog.hrs12.value).to.equal(12) // expect no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
	it('minutes', () => {
		const entryLog = createEntryLog()
		entryLog.minutes.add('p')
		expect(entryLog.minutes.entries).to.deep.equal([])
		expect(entryLog.minutes.value).to.equal(30) // expect no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('p')
		expect(entryLog.mode.value).to.equal('PM')
		expect(entryLog.fullValue12hr).to.equal('12:30 PM')
	})
})

describe('Other cases', () => {
	it('Add "2" to hrs', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('2')
		expect(entryLog.hrs12.entries).to.deep.equal([2])
		expect(entryLog.hrs12.value).to.equal(2)
		expect(entryLog.fullValue12hr).to.equal('02:30 AM')
	})
	it('Add "0" to hrs', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('0')
		expect(entryLog.hrs12.entries).to.deep.equal([])
		expect(entryLog.hrs12.value).to.equal(12) // no change
		expect(entryLog.fullValue12hr).to.equal(startingFullValue)
	})
	it('Add "p" to mode > add "m" to mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('p')
		entryLog.mode.add('m')
		expect(entryLog.mode.value).to.equal('PM')
		expect(entryLog.fullValue12hr).to.equal('12:30 PM')
	})
	it('Add "p" > "a" > "p" to mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('p')
		expect(entryLog.mode.value).to.equal('PM')
		expect(entryLog.fullValue12hr).to.equal('12:30 PM')
		entryLog.mode.add('a')
		expect(entryLog.mode.value).to.equal('AM')
		expect(entryLog.fullValue12hr).to.equal('12:30 AM')
		entryLog.mode.add('p')
		expect(entryLog.mode.value).to.equal('PM')
		expect(entryLog.fullValue12hr).to.equal('12:30 PM')
	})
})
