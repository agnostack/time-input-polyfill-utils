import { select } from "./selectors";
import { get } from "../getters/getters";
import { SelectionRange } from "../../types";
import { ranges } from "../staticValues";

const inputID = 'testInput'

const loadInput = (): Promise<HTMLInputElement> => new Promise((resolve) => {
	cy.visit('./core/selectors/selectors-test-file.html')
		.then((contentWindow: Window) => {
			let { document } = contentWindow
			const $input = <HTMLInputElement>document.getElementById(inputID)
			resolve($input)
		})
})

describe('Basic setup', () => {
	it('Element exists', async () => {
		await loadInput()
		cy.get(`#${inputID}`).should('exist')
	})
})

describe('Test cursor range values', () => {
	const testCursorRange = (index: number, expectation: SelectionRange) => {
		it(`test range indexes ${index}`, async () => {
			const $input = await loadInput()
			$input.selectionStart = index
			const output = get.rangeOf($input).cursorSegment()
			expect(output).to.deep.equal(expectation)
		})
	}

	testCursorRange(0, ranges.hrs)
	testCursorRange(1, ranges.hrs)
	testCursorRange(2, ranges.hrs)

	testCursorRange(3, ranges.min)
	testCursorRange(4, ranges.min)
	testCursorRange(5, ranges.min)

	testCursorRange(6, ranges.mode)
	testCursorRange(7, ranges.mode)
	testCursorRange(8, ranges.mode)
})

describe('Test cursor segment selection', () => {
	const testCursorSelection = (index: number, expectation: SelectionRange) => {
		it(`select pos ${index}`, async () => {
			const $input = await loadInput()
			$input.selectionStart = index
			select($input).cursorSegment()
			expectRange($input, expectation)
		})
	}

	const expectRange = ($input: HTMLInputElement, expectedRange: SelectionRange) => {
		const currentRange = get.rangeOf($input).fullSelection()
		expect(currentRange).to.deep.equal(expectedRange)
	}

	testCursorSelection(0, ranges.hrs)
	testCursorSelection(1, ranges.hrs)
	testCursorSelection(2, ranges.hrs)

	testCursorSelection(3, ranges.min)
	testCursorSelection(4, ranges.min)
	testCursorSelection(5, ranges.min)

	testCursorSelection(6, ranges.mode)
	testCursorSelection(7, ranges.mode)
	testCursorSelection(8, ranges.mode)
})
