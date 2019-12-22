import { get } from './getters'

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
