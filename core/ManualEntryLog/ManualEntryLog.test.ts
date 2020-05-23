import { ManualEntryLog } from './ManualEntryLog'

const createEntryLog = () => new ManualEntryLog({ hrs12: 12, hrs24: 0, min: 30, mode: 'AM' })

describe('Initialize', () => {
	it('hrs12', () => {
		const entryLog = createEntryLog()
		expect(entryLog.hrs12.entries).to.deep.equal([])
		expect(entryLog.hrs12.value).to.equal(12)
		expect(entryLog.hrs12.isFull).to.equal(true)
	})
	it('min', () => {
		const entryLog = createEntryLog()
		expect(entryLog.min.entries).to.deep.equal([])
		expect(entryLog.min.value).to.equal(30)
		expect(entryLog.min.isFull).to.equal(true)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		expect(entryLog.mode.entries).to.deep.equal([])
		expect(entryLog.mode.value).to.equal('AM')
	})
})

describe('Add "1"', () => {
	describe('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		expect(entryLog.hrs12.entries).to.deep.equal([1])
		expect(entryLog.hrs12.value).to.equal(1)
		expect(entryLog.hrs12.isFull).to.equal(false)
	})
	it('min', () => {
		const entryLog = createEntryLog()
		entryLog.min.add('1')
		expect(entryLog.min.entries).to.deep.equal([1])
		expect(entryLog.min.value).to.equal(1)
		expect(entryLog.min.isFull).to.equal(false)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('1')
		expect(entryLog.mode.entries).to.deep.equal([])
		expect(entryLog.mode.value).to.equal('AM') // expect no change
	})
})

describe('Add "1" > add "2"', () => {
	describe('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		entryLog.hrs12.add('2')
		expect(entryLog.hrs12.entries).to.deep.equal([1, 2])
		expect(entryLog.hrs12.value).to.equal(12)
		expect(entryLog.hrs12.isFull).to.equal(true)
	})
	it('min', () => {
		const entryLog = createEntryLog()
		entryLog.min.add('1')
		entryLog.min.add('2')
		expect(entryLog.min.entries).to.deep.equal([1, 2])
		expect(entryLog.min.value).to.equal(12)
		expect(entryLog.min.isFull).to.equal(true)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('1')
		entryLog.mode.add('2')
		expect(entryLog.mode.entries).to.deep.equal([])
		expect(entryLog.mode.value).to.equal('AM') // expect no change
	})
})

describe('Add "1" > add "2" > add "3"', () => {
	describe('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		entryLog.hrs12.add('2')
		entryLog.hrs12.add('3')
		expect(entryLog.hrs12.entries).to.deep.equal([3])
		expect(entryLog.hrs12.value).to.equal(3)
		expect(entryLog.hrs12.isFull).to.equal(true)
	})
	it('min', () => {
		const entryLog = createEntryLog()
		entryLog.min.add('1')
		entryLog.min.add('2')
		entryLog.min.add('3')
		expect(entryLog.min.entries).to.deep.equal([3])
		expect(entryLog.min.value).to.equal(3)
		expect(entryLog.min.isFull).to.equal(false)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('1')
		entryLog.mode.add('2')
		entryLog.mode.add('3')
		expect(entryLog.mode.entries).to.deep.equal([])
		expect(entryLog.mode.value).to.equal('AM') // expect no change
	})
})

describe('Add "1" > add "2" > add "3" > add "4"', () => {
	describe('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		entryLog.hrs12.add('2')
		entryLog.hrs12.add('3')
		entryLog.hrs12.add('4')
		expect(entryLog.hrs12.entries).to.deep.equal([4])
		expect(entryLog.hrs12.value).to.equal(4)
		expect(entryLog.hrs12.isFull).to.equal(true)
	})
	it('min', () => {
		const entryLog = createEntryLog()
		entryLog.min.add('1')
		entryLog.min.add('2')
		entryLog.min.add('3')
		entryLog.min.add('4')
		expect(entryLog.min.entries).to.deep.equal([3, 4])
		expect(entryLog.min.value).to.equal(34)
		expect(entryLog.min.isFull).to.equal(true)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('1')
		entryLog.mode.add('2')
		entryLog.mode.add('3')
		entryLog.mode.add('4')
		expect(entryLog.mode.entries).to.deep.equal([])
		expect(entryLog.mode.value).to.equal('AM') // expect no change
	})
})

describe('Add "0" expect no change', () => {
	describe('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('0')
		expect(entryLog.hrs12.entries).to.deep.equal([])
		expect(entryLog.hrs12.value).to.equal(12) // no change
		expect(entryLog.hrs12.isFull).to.equal(true)
	})
	it('min', () => {
		const entryLog = createEntryLog()
		entryLog.min.add('0')
		expect(entryLog.min.entries).to.deep.equal([])
		expect(entryLog.min.value).to.equal(30) // no change
		expect(entryLog.min.isFull).to.equal(true)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('0')
		expect(entryLog.mode.entries).to.deep.equal([])
		expect(entryLog.mode.value).to.equal('AM') // expect no change
	})
})
describe('Add "1" > add "0"', () => {
	describe('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('1')
		entryLog.hrs12.add('0')
		expect(entryLog.hrs12.entries).to.deep.equal([1, 0])
		expect(entryLog.hrs12.value).to.equal(10)
		expect(entryLog.hrs12.isFull).to.equal(true)
	})
	it('min', () => {
		const entryLog = createEntryLog()
		entryLog.min.add('1')
		entryLog.min.add('0')
		expect(entryLog.min.entries).to.deep.equal([1, 0])
		expect(entryLog.min.value).to.equal(10)
		expect(entryLog.min.isFull).to.equal(true)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('1')
		entryLog.mode.add('0')
		expect(entryLog.mode.entries).to.deep.equal([])
		expect(entryLog.mode.value).to.equal('AM') // expect no change
	})
})

describe('Add "p"', () => {
	describe('hrs12', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('p')
		expect(entryLog.hrs12.entries).to.deep.equal([])
		expect(entryLog.hrs12.value).to.equal(12) // expect no change
		expect(entryLog.hrs12.isFull).to.equal(true)
	})
	it('min', () => {
		const entryLog = createEntryLog()
		entryLog.min.add('p')
		expect(entryLog.min.entries).to.deep.equal([])
		expect(entryLog.min.value).to.equal(30) // expect no change
		expect(entryLog.min.isFull).to.equal(true)
	})
	it('mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('p')
		expect(entryLog.mode.entries).to.deep.equal(['p'])
		expect(entryLog.mode.value).to.equal('PM')
	})
})

describe('Other cases', () => {
	it('Add "2" to hrs', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('2')
		expect(entryLog.hrs12.entries).to.deep.equal([2])
		expect(entryLog.hrs12.value).to.equal(2)
		expect(entryLog.hrs12.isFull).to.equal(true)
	})
	it('Add "0" to hrs', () => {
		const entryLog = createEntryLog()
		entryLog.hrs12.add('0')
		expect(entryLog.hrs12.entries).to.deep.equal([])
		expect(entryLog.hrs12.value).to.equal(12) // no
		expect(entryLog.hrs12.isFull).to.equal(true)
	})
	it('Add "p" to mode > add "m" to mode', () => {
		const entryLog = createEntryLog()
		entryLog.mode.add('p')
		entryLog.mode.add('m')
		expect(entryLog.hrs12.entries).to.deep.equal(['p'])
		expect(entryLog.hrs12.value).to.equal('PM')
	})
})
