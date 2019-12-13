import { convert } from './converters'

describe('convert.hours24', () => {
	it('Expect 0 hrs to be 12', () => {
		expect(convert.hours24(0).toHours12()).to.equal(12)
	})
	it('Expect 5 hrs to be 5', () => {
		expect(convert.hours24(5).toHours12()).to.equal(5)
	})
	it('Expect 13 hrs to be 1', () => {
		expect(convert.hours24(13).toHours12()).to.equal(1)
	})
	it('Expect 24 hrs to be 0', () => {
		expect(convert.hours24(24).toHours12()).to.equal(12)
	})
})

describe('convert to number', () => {
	it('Expect "0" to be 0', () => {
		expect(convert.thing('0').toNumber()).to.equal(0)
	})
	it('Expect "abc" to be "abc"', () => {
		expect(convert.thing('abc').toNumber()).to.equal('abc')
	})
	it('Expect 0 to be 0', () => {
		expect(convert.thing(0).toNumber()).to.equal(0)
	})
})

describe('leading zero', () => {
	it('Expect 0 to be "00"', () => {
		expect(convert.thing(0).toLeadingZero()).to.equal('00')
	})
	it('Expect "abc" to be "abc"', () => {
		expect(convert.thing('abc').toLeadingZero()).to.equal('abc')
	})
	it('Expect 10 to be "10"', () => {
		expect(convert.thing(10).toLeadingZero()).to.equal('10')
	})
	it('Expect "10" to be "10"', () => {
		expect(convert.thing('10').toLeadingZero()).to.equal('10')
	})
})

describe('convert string 24hr', () => {
	it('Expect "" to be "--:-- --"', () => {
		expect(convert.string24hr('').to12hr()).to.equal('--:-- --')
	})
	it('Expect "0:00" to be "12:00 AM"', () => {
		expect(convert.string24hr('0:00').to12hr()).to.equal('12:00 AM')
	})
	it('Expect "5:30" to be "05:30 AM"', () => {
		expect(convert.string24hr('5:30').to12hr()).to.equal('05:30 AM')
	})
	it('Expect "05:30" to be "05:30 AM"', () => {
		expect(convert.string24hr('5:30').to12hr()).to.equal('05:30 AM')
	})
	it('Expect "11:00" to be "11:00 AM"', () => {
		expect(convert.string24hr('11:00').to12hr()).to.equal('11:00 AM')
	})
	it('Expect "12:00" to be "12:00 PM"', () => {
		expect(convert.string24hr('12:00').to12hr()).to.equal('12:00 PM')
	})
	it('Expect "13:00" to be "01:00 PM"', () => {
		expect(convert.string24hr('13:00').to12hr()).to.equal('01:00 PM')
	})
	it('Expect "24:00" to be "12:00 AM"', () => {
		expect(convert.string24hr('24:00').to12hr()).to.equal('12:00 AM')
	})
	it('Expect "25:30" to error', () => {
		try {
			convert.string24hr('25:30').to12hr()
		} catch (error) {
			expect(error.message).to.equal('Hours cannot be higher than 24')
		}
	})
})

describe('convert string 12hr', () => {
	it('Expect "--:-- --" to be ""', () => {
		expect(convert.string12hr('--:-- --').to24hr()).to.equal('')
	})
	it('Expect "01:-- --" to be ""', () => {
		expect(convert.string12hr('01:-- --').to24hr()).to.equal('')
	})
	it('Expect "--:02 --" to be ""', () => {
		expect(convert.string12hr('--:02 --').to24hr()).to.equal('')
	})
	it('Expect "--:-- AM" to be ""', () => {
		expect(convert.string12hr('--:-- AM').to24hr()).to.equal('')
	})
	it('Expect "12:00 AM" to be "00:00"', () => {
		expect(convert.string12hr('12:00 AM').to24hr()).to.equal('00:00')
	})
	it('Expect "05:30 AM" to be "05:30"', () => {
		expect(convert.string12hr('05:30 AM').to24hr()).to.equal('05:30')
	})
	it('Expect "11:00 AM" to be "11:00"', () => {
		expect(convert.string12hr('11:00 AM').to24hr()).to.equal('11:00')
	})
	it('Expect "12:00 PM" to be "12:00"', () => {
		expect(convert.string12hr('12:00 PM').to24hr()).to.equal('12:00')
	})
	it('Expect "01:00 PM" to be "13:00"', () => {
		expect(convert.string12hr('01:00 PM').to24hr()).to.equal('13:00')
	})
	it('Expect "11:30 PM" to be "23:30"', () => {
		expect(convert.string12hr('11:30 PM').to24hr()).to.equal('23:30')
	})
})
