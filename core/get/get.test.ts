import { get } from './get'
import { loadTestPage } from '../../cypress/support/loadTestPage'
import { blankValues, preFilledValues } from '../../cypress/support/staticTestValues'

getString12hrTests()
getString24hrTests()
getValueTests()

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
