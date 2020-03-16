import { loadTestPage } from "../../cypress/support/loadTestPage"
import { a11yID } from "../../cypress/support/staticTestValues"
import { a11y } from "./a11y"

/*
	TO DO:

	Make tests for these:

	- a11y.update($input, [ announcementArray ], document)
*/

async function createA11y() {
	const { document, $input } = await loadTestPage()
	a11y.create(document)
	return {
		$a11y: document.getElementById(a11yID),
		$input,
		document,
	}
}

const getA11y = () => cy.get(`#${a11yID}`)

describe('Create a11y element', () => {
	it('a11y exists', async () => {
		await createA11y()
		getA11y().should('exist')
	})
})

// TO DO: Make more a11y update tests
describe('Update a11y element', () => {
	it('a11y update [initial]', async () => {
		const { $input, document } = await createA11y()
		a11y.update($input, ['initial'], document)
		expect(document.getElementById(a11yID).textContent).to.equal('Blank input grouping blank:blank blank.')
	})
})
