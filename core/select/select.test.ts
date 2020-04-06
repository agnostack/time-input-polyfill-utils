import { selectCursorSegment, selectSegment, selectNextSegment, selectPrevSegment } from './select'
import { getRangeOf } from '../get/get'
import { SelectionRange, Segment } from '../../types/index'
import { ranges } from '../staticValues'
import { inputID } from '../../cypress/support/staticTestValues'
import { loadTestPage } from '../../cypress/support/loadTestPage'

const expectRange = ($input: HTMLInputElement | null, expectedRange: SelectionRange): void => {
	const currentRange = getRangeOf($input).rawSelection()
	expect(currentRange).to.deep.equal(expectedRange)
}

describe('Basic setup', () => {
	it('Element exists', async () => {
		await loadTestPage()
		cy.get(`#${inputID}`).should('exist')
	})
})

testCursorRangeValues()
testCursorSegmentSelection()
testSpecificSegmentSelection()
testNextSegmentSelection()
testPrevSegmentSelection()

function testCursorRangeValues(): void {
	describe('Test cursor range values', () => {
		const testCursorRange = (index: number, expectation: SelectionRange): void => {
			it(`test range index ${index}`, async () => {
				const { $input } = await loadTestPage()
				$input.selectionStart = index
				const output = getRangeOf($input).cursorSegment()
				expect(output).to.deep.equal(expectation)
			})
		}

		testCursorRange(0, ranges.hrs12)
		testCursorRange(1, ranges.hrs12)
		testCursorRange(2, ranges.hrs12)

		testCursorRange(3, ranges.min)
		testCursorRange(4, ranges.min)
		testCursorRange(5, ranges.min)

		testCursorRange(6, ranges.mode)
		testCursorRange(7, ranges.mode)
		testCursorRange(8, ranges.mode)
	})
}

function testCursorSegmentSelection(): void {
	describe('Test cursor segment selection', () => {
		const testCursorSelection = (index: number, expectation: SelectionRange): void => {
			it(`select segment at index ${index}`, async () => {
				const { $input } = await loadTestPage()
				$input.selectionStart = index
				selectCursorSegment($input)
				expectRange($input, expectation)
			})
		}

		it(`null selectCursorSegment`, () => {
			selectCursorSegment(null)
			expect('it_worked').to.equal('it_worked')
		})

		testCursorSelection(0, ranges.hrs12)
		testCursorSelection(1, ranges.hrs12)
		testCursorSelection(2, ranges.hrs12)

		testCursorSelection(3, ranges.min)
		testCursorSelection(4, ranges.min)
		testCursorSelection(5, ranges.min)

		testCursorSelection(6, ranges.mode)
		testCursorSelection(7, ranges.mode)
		testCursorSelection(8, ranges.mode)
	})
}

function testSpecificSegmentSelection(): void {
	describe('Test specific segment selection', () => {
		const testSegmentSelect = (segment: Segment, expectation: SelectionRange): void => {
			it(`null select ${segment}`, () => {
				selectSegment(null, segment)
				expect('it_worked').to.equal('it_worked')
			})

			it(`select segment ${segment}`, async () => {
				const { $input } = await loadTestPage()
				selectSegment($input, segment)
				expectRange($input, expectation)
			})
		}

		testSegmentSelect('hrs12', ranges.hrs12)
		testSegmentSelect('min', ranges.min)
		testSegmentSelect('mode', ranges.mode)
	})
}

function testNextSegmentSelection(): void {
	describe('Test next segment selection', () => {
		const testSegmentAfter = (segment: Segment, expectation: SelectionRange): void => {
			it(`select segment after ${segment}`, async () => {
				const { $input } = await loadTestPage()
				selectSegment($input, segment)
				selectNextSegment($input)
				expectRange($input, expectation)
			})
		}

		it(`null select next`, () => {
			selectNextSegment(null)
			expect('it_worked').to.equal('it_worked')
		})

		testSegmentAfter('hrs12', ranges.min)
		testSegmentAfter('min', ranges.mode)
		testSegmentAfter('mode', ranges.mode)
	})
}

function testPrevSegmentSelection(): void {
	describe('Test previous segment selection', () => {
		const testSegmentBefore = (segment: Segment, expectation: SelectionRange): void => {
			it(`select segment before ${segment}`, async () => {
				const { $input } = await loadTestPage()
				selectSegment($input, segment)
				selectPrevSegment($input)
				expectRange($input, expectation)
			})
		}

		it(`null select previous`, () => {
			selectPrevSegment(null)
			expect('it_worked').to.equal('it_worked')
		})

		testSegmentBefore('hrs12', ranges.hrs12)
		testSegmentBefore('min', ranges.hrs12)
		testSegmentBefore('mode', ranges.min)
	})
}
