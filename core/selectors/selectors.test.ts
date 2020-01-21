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

const expectRange = ($input: HTMLInputElement, range: SelectionRange) => {
	const currentRange = get.selectedRangeOf($input)
	const expectedRange = range

	expect(currentRange).to.deep.equal(expectedRange)
}

describe('Basic setup', () => {
	it('Element exists', async () => {
		await loadInput()
		cy.get(`#${inputID}`).should('exist')
	})
})

describe('Select current segment', () => {

	const testCursorSegment = (index: number, expectation: SelectionRange) => {
		it(`selects hrs pos ${index}`, async () => {
			const $input = await loadInput()
			$input.selectionStart = index
			select($input).cursorSegment()
			expectRange($input, expectation)
		})
	}

	testCursorSegment(0, ranges.hrs)
	testCursorSegment(1, ranges.hrs)
	testCursorSegment(2, ranges.hrs)

	testCursorSegment(3, ranges.min)
	testCursorSegment(4, ranges.min)
	testCursorSegment(5, ranges.min)

	testCursorSegment(6, ranges.mode)
	testCursorSegment(7, ranges.mode)
	testCursorSegment(8, ranges.mode)
})
