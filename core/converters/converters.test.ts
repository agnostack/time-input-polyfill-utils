import {
	convert_hours_to_12hr_time,
	convert_number,
	leading_zero,
	convert_to_12hr_time,
	convert_to_24hr_time,
} from './converters'

describe('convert_hours_to_12hr_time', () => {
	it('Expect 0 hrs to be 12', () => {
		expect(convert_hours_to_12hr_time(0)).to.equal(12)
	})
	it('Expect 5 hrs to be 5', () => {
		expect(convert_hours_to_12hr_time(5)).to.equal(5)
	})
	it('Expect 13 hrs to be 1', () => {
		expect(convert_hours_to_12hr_time(13)).to.equal(1)
	})
	it('Expect 24 hrs to be 0', () => {
		expect(convert_hours_to_12hr_time(24)).to.equal(12)
	})
})

describe('convert_number', () => {
	it('Expect "0" to be 0', () => {
		expect(convert_number('0')).to.equal(0)
	})
	it('Expect "abc" to be "abc"', () => {
		expect(convert_number('abc')).to.equal('abc')
	})
	it('Expect 0 to be 0', () => {
		expect(convert_number(0)).to.equal(0)
	})
})

describe('leading_zero', () => {
	it('Expect 0 to be "00"', () => {
		expect(leading_zero(0)).to.equal('00')
	})
	it('Expect "abc" to be "abc"', () => {
		expect(leading_zero('abc')).to.equal('abc')
	})
	it('Expect 10 to be "10"', () => {
		expect(leading_zero(10)).to.equal('10')
	})
	it('Expect "10" to be "10"', () => {
		expect(leading_zero('10')).to.equal('10')
	})
})

describe('convert_to_12hr_time', () => {
	it('Expect "" to be "--:-- --"', () => {
		expect(convert_to_12hr_time('')).to.equal('--:-- --')
	})
	it('Expect "0:00" to be "12:00 AM"', () => {
		expect(convert_to_12hr_time('0:00')).to.equal('12:00 AM')
	})
	it('Expect "5:30" to be "05:30 AM"', () => {
		expect(convert_to_12hr_time('5:30')).to.equal('05:30 AM')
	})
	it('Expect "05:30" to be "05:30 AM"', () => {
		expect(convert_to_12hr_time('5:30')).to.equal('05:30 AM')
	})
	it('Expect "11:00" to be "11:00 AM"', () => {
		expect(convert_to_12hr_time('11:00')).to.equal('11:00 AM')
	})
	it('Expect "12:00" to be "12:00 PM"', () => {
		expect(convert_to_12hr_time('12:00')).to.equal('12:00 PM')
	})
	it('Expect "13:00" to be "01:00 PM"', () => {
		expect(convert_to_12hr_time('13:00')).to.equal('01:00 PM')
	})
	it('Expect "24:00" to be "12:00 AM"', () => {
		expect(convert_to_12hr_time('24:00')).to.equal('12:00 AM')
	})
	it('Expect "25:30" to error', () => {
		try {
			convert_to_12hr_time('25:30')
		} catch (error) {
			expect(error.message).to.equal('Hours cannot be higher than 24')
		}
	})
})

describe('convert_to_24hr_time', () => {
	it('Expect "--:-- --" to be ""', () => {
		expect(convert_to_24hr_time('--:-- --')).to.equal('')
	})
	it('Expect "01:-- --" to be ""', () => {
		expect(convert_to_24hr_time('01:-- --')).to.equal('')
	})
	it('Expect "--:02 --" to be ""', () => {
		expect(convert_to_24hr_time('--:02 --')).to.equal('')
	})
	it('Expect "--:-- AM" to be ""', () => {
		expect(convert_to_24hr_time('--:-- AM')).to.equal('')
	})
	it('Expect "12:00 AM" to be "00:00"', () => {
		expect(convert_to_24hr_time('12:00 AM')).to.equal('00:00')
	})
	it('Expect "05:30 AM" to be "05:30"', () => {
		expect(convert_to_24hr_time('05:30 AM')).to.equal('05:30')
	})
	it('Expect "11:00 AM" to be "11:00"', () => {
		expect(convert_to_24hr_time('11:00 AM')).to.equal('11:00')
	})
	it('Expect "12:00 PM" to be "12:00"', () => {
		expect(convert_to_24hr_time('12:00 PM')).to.equal('12:00')
	})
	it('Expect "01:00 PM" to be "13:00"', () => {
		expect(convert_to_24hr_time('01:00 PM')).to.equal('13:00')
	})
	it('Expect "11:30 PM" to be "23:30"', () => {
		expect(convert_to_24hr_time('11:30 PM')).to.equal('23:30')
	})
})
