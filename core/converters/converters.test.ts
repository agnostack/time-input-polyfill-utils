import {
	convert_hours_to_12hr_time,
	convert_number,
	leading_zero,
	convert_to_12hr_time,
	convert_to_24hr_time,
} from './converters'

describe('convert_hours_to_12hr_time', () => {
	test('Expect 0 hrs to be 12', () => {
		expect(convert_hours_to_12hr_time(0)).toBe(12)
	})
	test('Expect 5 hrs to be 5', () => {
		expect(convert_hours_to_12hr_time(5)).toBe(5)
	})
	test('Expect 13 hrs to be 1', () => {
		expect(convert_hours_to_12hr_time(13)).toBe(1)
	})
	test('Expect 24 hrs to be 0', () => {
		expect(convert_hours_to_12hr_time(24)).toBe(12)
	})
})

describe('convert_number', () => {
	test('Expect "0" to be 0', () => {
		expect(convert_number('0')).toBe(0)
	})
	test('Expect "abc" to be "abc"', () => {
		expect(convert_number('abc')).toBe('abc')
	})
	test('Expect 0 to be 0', () => {
		expect(convert_number(0)).toBe(0)
	})
})

describe('leading_zero', () => {
	test('Expect 0 to be "00"', () => {
		expect(leading_zero(0)).toBe('00')
	})
	test('Expect "abc" to be "abc"', () => {
		expect(leading_zero('abc')).toBe('abc')
	})
	test('Expect 10 to be "10"', () => {
		expect(leading_zero(10)).toBe('10')
	})
	test('Expect "10" to be "10"', () => {
		expect(leading_zero('10')).toBe('10')
	})
})

describe('convert_to_12hr_time', () => {
	test('Expect "" to be "--:-- --"', () => {
		expect(convert_to_12hr_time('')).toBe('--:-- --')
	})
	test('Expect "0:00" to be "12:00 AM"', () => {
		expect(convert_to_12hr_time('0:00')).toBe('12:00 AM')
	})
	test('Expect "5:30" to be "05:30 AM"', () => {
		expect(convert_to_12hr_time('5:30')).toBe('05:30 AM')
	})
	test('Expect "05:30" to be "05:30 AM"', () => {
		expect(convert_to_12hr_time('5:30')).toBe('05:30 AM')
	})
	test('Expect "11:00" to be "11:00 AM"', () => {
		expect(convert_to_12hr_time('11:00')).toBe('11:00 AM')
	})
	test('Expect "12:00" to be "12:00 PM"', () => {
		expect(convert_to_12hr_time('12:00')).toBe('12:00 PM')
	})
	test('Expect "13:00" to be "01:00 PM"', () => {
		expect(convert_to_12hr_time('13:00')).toBe('01:00 PM')
	})
	test('Expect "24:00" to be "12:00 AM"', () => {
		expect(convert_to_12hr_time('24:00')).toBe('12:00 AM')
	})
	test('Expect "25:30" to error', () => {
		try {
			convert_to_12hr_time('25:30')
		} catch (error) {
			expect(error.message).toBe('Hours cannot be higher than 24')
		}
	})
})

describe('convert_to_24hr_time', () => {
	test('Expect "--:-- --" to be ""', () => {
		expect(convert_to_24hr_time('--:-- --')).toBe('')
	})
	test('Expect "01:-- --" to be ""', () => {
		expect(convert_to_24hr_time('01:-- --')).toBe('')
	})
	test('Expect "--:02 --" to be ""', () => {
		expect(convert_to_24hr_time('--:02 --')).toBe('')
	})
	test('Expect "--:-- AM" to be ""', () => {
		expect(convert_to_24hr_time('--:-- AM')).toBe('')
	})
	test('Expect "12:00 AM" to be "00:00"', () => {
		expect(convert_to_24hr_time('12:00 AM')).toBe('00:00')
	})
	test('Expect "05:30 AM" to be "05:30"', () => {
		expect(convert_to_24hr_time('05:30 AM')).toBe('05:30')
	})
	test('Expect "11:00 AM" to be "11:00"', () => {
		expect(convert_to_24hr_time('11:00 AM')).toBe('11:00')
	})
	test('Expect "12:00 PM" to be "12:00"', () => {
		expect(convert_to_24hr_time('12:00 PM')).toBe('12:00')
	})
	test('Expect "01:00 PM" to be "13:00"', () => {
		expect(convert_to_24hr_time('01:00 PM')).toBe('13:00')
	})
	test('Expect "11:30 PM" to be "23:30"', () => {
		expect(convert_to_24hr_time('11:30 PM')).toBe('23:30')
	})
})
