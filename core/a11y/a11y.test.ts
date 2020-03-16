import { loadTestPage } from "../../cypress/support/loadTestPage"
import { a11yID } from "../../cypress/support/staticTestValues"
import { a11y } from "./a11y"
import { select } from "../select/select"

async function createA11y() {
	const { document, $input, $inputPreFilled } = await loadTestPage()
	a11y.create(document)
	return {
		$a11y: document.getElementById(a11yID),
		$input,
		$inputPreFilled,
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

// TO DO: Refactor to make less repetitive
describe('Update a11y element', () => {
	_initial_()
	_select_()
	_update_()
	_initial_select_update_()

	function _initial_() {
		describe('[initial]', () => {
			it('$input [initial]', async () => {
				const { $input, document } = await createA11y()
				a11y.update($input, ['initial'], document)
				expect(document.getElementById(a11yID).textContent).to.equal('Blank input grouping blank:blank blank.')
			})
			it('$inputPreFilled [initial]', async () => {
				const { $inputPreFilled, document } = await createA11y()
				a11y.update($inputPreFilled, ['initial'], document)
				expect(document.getElementById(a11yID).textContent).to.equal('Pre-filled input grouping 12:00 AM.')
			})
		})
	}

	function _select_() {
		describe('[select]', () => {
			hours()
			minutes()
			mode()

			function hours() {
				describe('hours', () => {
					it('$input [select (hours)]', async () => {
						const { $input, document } = await createA11y()
						a11y.update($input, ['select'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('Hours spin button blank.')
					})
					it('$inputPreFilled [select (hours)]', async () => {
						const { $inputPreFilled, document } = await createA11y()
						a11y.update($inputPreFilled, ['select'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('Hours spin button 12.')
					})
				})
			}
			function minutes() {
				describe('minutes', () => {
					it('$input [select (minutes)]', async () => {
						const { $input, document } = await createA11y()
						select($input).segment('min')
						a11y.update($input, ['select'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('Minutes spin button blank.')
					})
					it('$inputPreFilled [select (minutes)]', async () => {
						const { $inputPreFilled, document } = await createA11y()
						select($inputPreFilled).segment('min')
						a11y.update($inputPreFilled, ['select'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('Minutes spin button 0.')
					})
				})
			}
			function mode() {
				describe('mode', () => {
					it('$input [select (mode)]', async () => {
						const { $input, document } = await createA11y()
						select($input).segment('mode')
						a11y.update($input, ['select'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('AM/PM spin button blank.')
					})
					it('$inputPreFilled [select (mode)]', async () => {
						const { $inputPreFilled, document } = await createA11y()
						select($inputPreFilled).segment('mode')
						a11y.update($inputPreFilled, ['select'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('AM/PM spin button AM.')
					})
				})
			}
		})
	}

	function _update_() {
		describe('[update]', () => {
			hours()
			minutes()
			mode()

			function hours() {
				describe('hours', () => {
					it('$input [update (hours)]', async () => {
						const { $input, document } = await createA11y()
						a11y.update($input, ['update'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('blank.')
					})
					it('$inputPreFilled [update (hours)]', async () => {
						const { $inputPreFilled, document } = await createA11y()
						a11y.update($inputPreFilled, ['update'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('12.')
					})
				})
			}
			function minutes() {
				describe('minutes', () => {
					it('$input [update (minutes)]', async () => {
						const { $input, document } = await createA11y()
						select($input).segment('min')
						a11y.update($input, ['update'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('blank.')
					})
					it('$inputPreFilled [update (minutes)]', async () => {
						const { $inputPreFilled, document } = await createA11y()
						select($inputPreFilled).segment('min')
						a11y.update($inputPreFilled, ['update'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('0.')
					})
				})
			}
			function mode() {
				describe('mode', () => {
					it('$input [update (mode)]', async () => {
						const { $input, document } = await createA11y()
						select($input).segment('mode')
						a11y.update($input, ['update'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('blank.')
					})
					it('$inputPreFilled [update (mode)]', async () => {
						const { $inputPreFilled, document } = await createA11y()
						select($inputPreFilled).segment('mode')
						a11y.update($inputPreFilled, ['update'], document)
						expect(document.getElementById(a11yID).textContent).to.equal('AM.')
					})
				})
			}
		})
	}

	function _initial_select_update_() {
		describe('[initial, select, update]', () => {
			hours()
			minutes()
			mode()

			function hours() {
				describe('hours', () => {
					it('$input [initial, select, update] (hours)', async () => {
						const { $input, document } = await createA11y()
						a11y.update($input, ['initial', 'select', 'update'], document)
						expect(document.getElementById(a11yID).innerHTML).to.equal('<p>Blank input grouping blank:blank blank.</p><p>Hours spin button blank.</p><p>blank.</p>')
					})
					it('$inputPreFilled [initial, select, update] (hours)', async () => {
						const { $inputPreFilled, document } = await createA11y()
						a11y.update($inputPreFilled, ['initial', 'select', 'update'], document)
						expect(document.getElementById(a11yID).innerHTML).to.equal('<p>Pre-filled input grouping 12:00 AM.</p><p>Hours spin button 12.</p><p>12.</p>')
					})
				})
			}
			function minutes() {
				describe('minutes', () => {
					it('$input [initial, select, update] (minutes)', async () => {
						const { $input, document } = await createA11y()
						select($input).segment('min')
						a11y.update($input, ['initial', 'select', 'update'], document)
						expect(document.getElementById(a11yID).innerHTML).to.equal('<p>Blank input grouping blank:blank blank.</p><p>Minutes spin button blank.</p><p>blank.</p>')
					})
					it('$inputPreFilled [initial, select, update] (minutes)', async () => {
						const { $inputPreFilled, document } = await createA11y()
						select($inputPreFilled).segment('min')
						a11y.update($inputPreFilled, ['initial', 'select', 'update'], document)
						expect(document.getElementById(a11yID).innerHTML).to.equal('<p>Pre-filled input grouping 12:00 AM.</p><p>Minutes spin button 0.</p><p>0.</p>')
					})
				})
			}
			function mode() {
				describe('mode', () => {
					it('$input [initial, select, update] (mode)', async () => {
						const { $input, document } = await createA11y()
						select($input).segment('mode')
						a11y.update($input, ['initial', 'select', 'update'], document)
						expect(document.getElementById(a11yID).innerHTML).to.equal('<p>Blank input grouping blank:blank blank.</p><p>AM/PM spin button blank.</p><p>blank.</p>')
					})
					it('$inputPreFilled [initial, select, update] (mode)', async () => {
						const { $inputPreFilled, document } = await createA11y()
						select($inputPreFilled).segment('mode')
						a11y.update($inputPreFilled, ['initial', 'select', 'update'], document)
						expect(document.getElementById(a11yID).innerHTML).to.equal('<p>Pre-filled input grouping 12:00 AM.</p><p>AM/PM spin button AM.</p><p>AM.</p>')
					})
				})
			}
		})
	}
})
