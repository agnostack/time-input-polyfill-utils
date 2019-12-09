import { manual_entry_log } from './manual_entry_log'

const entryLog = new manual_entry_log()

test('Expect hrs to be []', () => {
	expect(entryLog.hrs).toStrictEqual([])
})

test('Expect min to be []', () => {
	expect(entryLog.min).toStrictEqual([])
})

test('Expect mode to be []', () => {
	expect(entryLog.mode).toStrictEqual([])
})

// ==========================

test('Adds "1" to hrs', () => {
	entryLog.add('hrs', '1')
	expect(entryLog.hrs).toStrictEqual([1])
})
test('Adds "1" to min', () => {
	entryLog.add('min', '1')
	expect(entryLog.min).toStrictEqual([1])
})
test('Adds "1" to mode', () => {
	entryLog.add('mode', '1')
	expect(entryLog.mode).toStrictEqual([1])
})

// ==========================

test('Adds "2" to hrs', () => {
	entryLog.add('hrs', '2')
	expect(entryLog.hrs).toStrictEqual([1, 2])
})
test('Adds "2" to min', () => {
	entryLog.add('min', '2')
	expect(entryLog.min).toStrictEqual([1, 2])
})
test('Adds "2" to mode', () => {
	entryLog.add('mode', '2')
	expect(entryLog.mode).toStrictEqual([1, 2])
})

// ==========================

test('clears hrs', () => {
	entryLog.clear('hrs')
	expect(entryLog.hrs).toStrictEqual([])
})
test('clears min', () => {
	entryLog.clear('min')
	expect(entryLog.min).toStrictEqual([])
})
test('clears mode', () => {
	entryLog.clear('mode')
	expect(entryLog.mode).toStrictEqual([])
})

// ==========================

test('clear all', () => {
	entryLog.add('hrs', '1')
	entryLog.add('min', '1')
	entryLog.add('mode', '1')
	entryLog.clearAll()
	expect(entryLog.hrs).toStrictEqual([])
	expect(entryLog.min).toStrictEqual([])
	expect(entryLog.mode).toStrictEqual([])
})
