import { manual_entry_log } from './manual_entry_log'

const entryLog = new manual_entry_log()

describe('Initial values', () => {
	it('Expect hrs to be []', () => {
		expect(entryLog.hrs).to.deep.equal([])
	})

	it('Expect min to be []', () => {
		expect(entryLog.min).to.deep.equal([])
	})

	it('Expect mode to be []', () => {
		expect(entryLog.mode).to.deep.equal([])
	})
})

describe('Adding 1 to each key', () => {
	it('Adds "1" to hrs', () => {
		entryLog.add('hrs', '1')
		expect(entryLog.hrs).to.deep.equal([1])
	})
	it('Adds "1" to min', () => {
		entryLog.add('min', '1')
		expect(entryLog.min).to.deep.equal([1])
	})
	it('Adds "1" to mode', () => {
		entryLog.add('mode', '1')
		expect(entryLog.mode).to.deep.equal([1])
	})
})

describe('Adding a 2nd value to each key', () => {
	it('Adds "2" to hrs', () => {
		entryLog.add('hrs', '2')
		expect(entryLog.hrs).to.deep.equal([1, 2])
	})
	it('Adds "2" to min', () => {
		entryLog.add('min', '2')
		expect(entryLog.min).to.deep.equal([1, 2])
	})
	it('Adds "2" to mode', () => {
		entryLog.add('mode', '2')
		expect(entryLog.mode).to.deep.equal([1, 2])
	})
})

describe('Clearing each value in each key', () => {
	it('clears hrs', () => {
		entryLog.clear('hrs')
		expect(entryLog.hrs).to.deep.equal([])
		expect(entryLog.min).to.deep.equal([1, 2])
		expect(entryLog.mode).to.deep.equal([1, 2])
	})
	it('clears min', () => {
		entryLog.clear('min')
		expect(entryLog.hrs).to.deep.equal([])
		expect(entryLog.min).to.deep.equal([])
		expect(entryLog.mode).to.deep.equal([1, 2])
	})
	it('clears mode', () => {
		entryLog.clear('mode')
		expect(entryLog.hrs).to.deep.equal([])
		expect(entryLog.min).to.deep.equal([])
		expect(entryLog.mode).to.deep.equal([])
	})
})

describe('Clearing all keys at once', () => {
	it('clear all', () => {
		entryLog.add('hrs', '1')
		entryLog.add('min', '1')
		entryLog.add('mode', '1')
		entryLog.clearAll()
		expect(entryLog.hrs).to.deep.equal([])
		expect(entryLog.min).to.deep.equal([])
		expect(entryLog.mode).to.deep.equal([])
	})
})
