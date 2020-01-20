import { select } from "./selectors";

const inputID = 'testInput'
const getInput = (id: string = inputID) => document.getElementById(id)

const open_test_page = () => {
	before(() => {
		cy.visit('./core/selectors/selectors-test-file.html')
	})
}

describe('Basic setup', () => {
	open_test_page()

	it('Element exists', () => {
		cy.get(`#${inputID}`).should('exist')
	})
})

// describe('')
// select($input).nextSegment()
