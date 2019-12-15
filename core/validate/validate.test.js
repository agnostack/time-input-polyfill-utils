import { validate } from './validate'

/* global describe, expect, it */

const fail = (message = 'FAIL') => {
	throw new Error(message)
}

describe('validate 12 hour time', () => {
	it('"12:00" FAIL', () => {
		try {
			validate.string12hr('12:00')
			fail()
		} catch (err) {
			expect(err.message).to.equal('"12:00" is not a valid 12 hour time')
		}
	})
	it('"" FAIL', () => {
		try {
			validate.string12hr('')
			fail()
		} catch (err) {
			expect(err.message).to.equal('"" is not a valid 12 hour time')
		}
	})
	it('"12:00 AM" PASS', () => {
		expect(validate.string12hr('12:00 AM')).to.equal(true)
	})
	it('"12:59 AM" PASS', () => {
		expect(validate.string12hr('12:59 AM')).to.equal(true)
	})
	it('"12:60 AM" FAIL', () => {
		try {
			validate.string12hr('12:60 AM')
			fail()
		} catch (err) {
			expect(err.message).to.equal('"12:60 AM" is not a valid 12 hour time')
		}
	})
	it('"13:00 AM" FAIL', () => {
		try {
			validate.string12hr('13:00 PM')
			fail()
		} catch (err) {
			expect(err.message).to.equal('"13:00 PM" is not a valid 12 hour time')
		}
	})
	it('"2:00 PM" PASS', () => {
		expect(validate.string12hr('2:00 PM')).to.equal(true)
	})
	it('"--:-- PM" PASS', () => {
		expect(validate.string12hr('--:-- PM')).to.equal(true)
	})
	it('"--:--" FAIL', () => {
		try {
			validate.string12hr('')
			fail()
		} catch (err) {
			expect(err.message).to.equal('"" is not a valid 12 hour time')
		}
	})
})

describe('validate 24 hour time', () => {
	it('"00:00" PASS', () => {
		expect(validate.string24hr('12:00')).to.equal(true)
	})
	it('"12:00" PASS', () => {
		expect(validate.string24hr('12:00')).to.equal(true)
	})
	it('"12:59" PASS', () => {
		expect(validate.string24hr('12:59')).to.equal(true)
	})
	it('"12:60" FAIL', () => {
		try {
			validate.string24hr('12:60')
			fail()
		} catch (err) {
			expect(err.message).to.equal('"12:60" is not a valid 24 hour time')
		}
	})
	it('"24:00" FAIL', () => {
		try {
			validate.string24hr('24:00')
			fail()
		} catch (err) {
			expect(err.message).to.equal('"24:00" is not a valid 24 hour time')
		}
	})
	it('"" PASS', () => {
		expect(validate.string24hr('')).to.equal(true)
	})
	it('"12:00 AM" FAIL', () => {
		try {
			validate.string24hr('12:00 AM')
			fail()
		} catch (err) {
			expect(err.message).to.equal('"12:00 AM" is not a valid 24 hour time')
		}
	})
	it('"2:00 PM" FAIL', () => {
		try {
			validate.string24hr('2:00 PM')
			fail()
		} catch (err) {
			expect(err.message).to.equal('"2:00 PM" is not a valid 24 hour time')
		}
	})
	it('"--:-- PM" FAIL', () => {
		try {
			validate.string24hr('--:-- PM')
			fail()
		} catch (err) {
			expect(err.message).to.equal('"--:-- PM" is not a valid 24 hour time')
		}
	})
})

describe('validate time object', () => {
	it('needs tests written', () => {
		fail()
	})
})
