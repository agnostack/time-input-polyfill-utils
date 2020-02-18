import { loadTestPage } from "../../cypress/support/loadTestPage"
import { inputID, a11yID } from "../../cypress/support/staticTestValues"
import { a11y } from "./a11y"

/*
	TO DO:

	Make tests for these:

	- a11y.update($input, [ announcementArray ], document)
*/


describe('Basic setup', () => {
	it('Input exists', async () => {
		await loadTestPage()
		cy.get(`#${inputID}`).should('exist')
	})
})

describe('Create a11y element', () => {
	it('a11y exists', async () => {
		const { document } = await loadTestPage()
		a11y.create(document)
		cy.get(`#${a11yID}`).should('exist')
	})
})
