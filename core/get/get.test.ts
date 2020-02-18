import { get } from './get'
import { loadTestPage } from '../../cypress/support/loadTestPage'
import { blankValues, preFilledValues } from '../../cypress/support/staticTestValues'
import { SelectionRange } from '../../types'
import { ranges } from '../staticValues'
import { failTest } from '../../cypress/helpers/failTest'

getString12hrTests()
getString24hrTests()
getValueTests()
getLabelTextTests()
getRangeTests()

/*
	TO DO:

	Make tests for these:

	- get.rangeOf($input).nextSegment()
	- get.rangeOf($input).prevSegment()
	- get.ancestorsOf($input)
	- get.ancestorsOf($input, selector)
*/

function getString12hrTests() {
	describe('get string 12hr', () => {
		it('expects get 12:30 PM hrs12 => 12', () => {
			expect(get.string12hr('12:30 PM').hrs12).to.equal(12)
		})
		it('expects get 1:30 PM hrs24 => 13', () => {
			expect(get.string12hr('1:30 PM').hrs24).to.equal(13)
		})
		it('expects get 1:30 PM min => 30', () => {
			expect(get.string12hr('1:30 PM').min).to.equal(30)
		})
		it('expects get 1:30 PM mode => PM', () => {
			expect(get.string12hr('1:30 PM').mode).to.equal('PM')
		})
	})
}

function getString24hrTests() {
	describe('get string 24hr', () => {
		it('expects get 0:30 hrs12 => 12', () => {
			expect(get.string24hr('00:30').hrs12).to.equal(12)
		})
		it('expects get 0:30 hrs24 => 0', () => {
			expect(get.string24hr('00:30').hrs24).to.equal(0)
		})
		it('expects get 0:30 min => 30', () => {
			expect(get.string24hr('00:30').min).to.equal(30)
		})
		it('expects get 0:30 mode => AM', () => {
			expect(get.string24hr('00:30').mode).to.equal('AM')
		})
	})
}

function getValueTests() {
	describe('Get value from input', () => {
		blankInputTests()
		preFilledInputTests()

		function blankInputTests() {
			describe('Blank input', () => {
				it(`expects blank => "${blankValues.string12hr}"`, async () => {
					const { $input } = await loadTestPage()
					expect(get.inputValue($input).as12hrString()).to.equal(blankValues.string12hr)
				})
				it(`expects blank => "${blankValues.string24hr}"`, async () => {
					const { $input } = await loadTestPage()
					expect(get.inputValue($input).as24hrString()).to.equal(blankValues.string24hr)
				})
				it(`expects blank => ${JSON.stringify(blankValues.timeObject)}`, async () => {
					const { $input } = await loadTestPage()
					expect(get.inputValue($input).asTimeObject()).to.deep.equal(blankValues.timeObject)
				})
			})
		}

		function preFilledInputTests() {
			describe('Pre-filled input', () => {
				it(`expects "12:00 AM" => "${preFilledValues.string12hr}"`, async () => {
					const { $inputPreFilled } = await loadTestPage()
					expect(get.inputValue($inputPreFilled).as12hrString()).to.equal(preFilledValues.string12hr)
				})
				it(`expects "12:00 AM" => "${preFilledValues.string24hr}"`, async () => {
					const { $inputPreFilled } = await loadTestPage()
					expect(get.inputValue($inputPreFilled).as24hrString()).to.equal(preFilledValues.string24hr)
				})
				it(`expects "12:00 AM" => ${JSON.stringify(preFilledValues.timeObject)}`, async () => {
					const { $inputPreFilled } = await loadTestPage()
					expect(get.inputValue($inputPreFilled).asTimeObject()).to.deep.equal(preFilledValues.timeObject)
				})
			})
		}
	})
}

function getLabelTextTests() {
	describe('Get label text for input', async () => {
		const loadPage = () => loadTestPage('./core/get/label-tests-file.html')

		it(`aria-labelledby`, async () => {
			const { document } = await loadPage()
			const $input = <HTMLInputElement>document.querySelector('[aria-labelledby="aria-labelledby"]')
			expect(get.labelTextOf($input, document)).to.equal('aria-labelledby label')
		})
		it(`aria-label`, async () => {
			const { document } = await loadPage()
			const $input = <HTMLInputElement>document.querySelector('[aria-label="aria-label label"]')
			expect(get.labelTextOf($input, document)).to.equal('aria-label label')
		})
		it(`For attribute`, async () => {
			const { document } = await loadPage()
			const $input = <HTMLInputElement>document.getElementById('forAttr')
			expect(get.labelTextOf($input, document)).to.equal('For attribute label')
		})
		it(`Wrapper label`, async () => {
			const { document } = await loadPage()
			const $input = <HTMLInputElement>document.getElementById('wrappedInput')
			expect(get.labelTextOf($input, document)).to.equal('Wrapper label')
		})
		it(`Title label`, async () => {
			const { document } = await loadPage()
			const $input = <HTMLInputElement>document.querySelector('[title="title label"]')
			expect(get.labelTextOf($input, document)).to.equal('title label')
		})
		it(`Missing label`, async () => {
			const { document } = await loadPage()
			const $input = <HTMLInputElement>document.getElementById('noLabel')
			failTest(() => get.labelTextOf($input, document), 'Cannot polyfill time input due to a missing label.')
		})
	})
}

function getRangeTests() {
	describe('Get range of input tests', () => {
		fullSelectionTests()
		cursorSegmentTests()

		function fullSelectionTests() {
			describe('rawSelection tests', () => {
				testRangeAt(0, { start: 0, end: 0, segment: 'hrs12' })
				testRangeAt(1, { start: 1, end: 1, segment: 'hrs12' })
				testRangeAt(2, { start: 2, end: 2, segment: 'hrs12' })

				testRangeAt(3, { start: 3, end: 3, segment: 'min' })
				testRangeAt(4, { start: 4, end: 4, segment: 'min' })
				testRangeAt(5, { start: 5, end: 5, segment: 'min' })

				testRangeAt(6, { start: 6, end: 6, segment: 'mode' })
				testRangeAt(7, { start: 7, end: 7, segment: 'mode' })
				testRangeAt(8, { start: 8, end: 8, segment: 'mode' })

				testRangeAt(0, { start: 0, end: 8, segment: 'hrs12' }, 8)
				testRangeAt(1, { start: 1, end: 8, segment: 'hrs12' }, 8)
				testRangeAt(2, { start: 2, end: 8, segment: 'hrs12' }, 8)

				testRangeAt(3, { start: 3, end: 8, segment: 'min' }, 8)
				testRangeAt(4, { start: 4, end: 8, segment: 'min' }, 8)
				testRangeAt(5, { start: 5, end: 8, segment: 'min' }, 8)

				testRangeAt(6, { start: 6, end: 8, segment: 'mode' }, 8)
				testRangeAt(7, { start: 7, end: 8, segment: 'mode' }, 8)

				function testRangeAt(position: number, expectation: SelectionRange, position2 = position) {
					it(`range at ${position}-${position2}`, async () => {
						const { $input } = await loadTestPage()
						$input.setSelectionRange(position, position2)
						expect(get.rangeOf($input).rawSelection()).to.deep.equal(expectation)
					})
				}

			})
		}

		function cursorSegmentTests() {
			describe('cursorSegment tests', () => {
				testRangeAt(0, ranges.hrs12)
				testRangeAt(1, ranges.hrs12)
				testRangeAt(2, ranges.hrs12)

				testRangeAt(3, ranges.min)
				testRangeAt(4, ranges.min)
				testRangeAt(5, ranges.min)

				testRangeAt(6, ranges.mode)
				testRangeAt(7, ranges.mode)
				testRangeAt(8, ranges.mode)

				testRangeAt(0, ranges.hrs12, 8)
				testRangeAt(1, ranges.hrs12, 8)
				testRangeAt(2, ranges.hrs12, 8)

				testRangeAt(3, ranges.min, 8)
				testRangeAt(4, ranges.min, 8)
				testRangeAt(5, ranges.min, 8)

				testRangeAt(6, ranges.mode, 8)
				testRangeAt(7, ranges.mode, 8)

				function testRangeAt(position: number, expectation: SelectionRange, position2 = position) {
					it(`range at ${position}-${position2}`, async () => {
						const { $input } = await loadTestPage()
						$input.setSelectionRange(position, position2)
						expect(get.rangeOf($input).cursorSegment()).to.deep.equal(expectation)
					})
				}

			})
		}
	})
}
