import { string12hr } from './modifiers'

describe('Modify initial string values', () => {
	//////////////////////////////////////////

	describe('Increment hours to 12hr', () => {
		it('09:00 AM => 10:00 AM', () => {
			expect(string12hr.increment.hrs.to12hr('09:00 AM')).to.equal(
				'10:00 AM',
			)
		})
		it('12:30 PM => 01:30 PM', () => {
			expect(string12hr.increment.hrs.to12hr('12:30 PM')).to.equal(
				'01:30 PM',
			)
		})
		it('11:00 PM => 12:00 AM', () => {
			expect(string12hr.increment.hrs.to12hr('11:00 PM')).to.equal(
				'12:00 AM',
			)
		})
	})

	describe('Increment hours to 24hr', () => {
		it('09:00 AM => 10:00', () => {
			expect(string12hr.increment.hrs.to24hr('09:00 AM')).to.equal(
				'10:00',
			)
		})
		it('12:30 PM => 13:30', () => {
			expect(string12hr.increment.hrs.to24hr('12:30 PM')).to.equal(
				'13:30',
			)
		})
		it('11:00 PM => 00:00', () => {
			expect(string12hr.increment.hrs.to24hr('11:00 PM')).to.equal(
				'00:00',
			)
		})
	})

	describe('Increment hours to object', () => {
		it('09:00 AM => {hrs:10, min:0, mode:AM}', () => {
			expect(string12hr.increment.hrs.toObject('09:00 AM')).to.equal({
				hrs: 10,
				min: 0,
				mode: 'AM',
			})
		})
		it('12:30 PM => {hrs:1, min:30, mode:PM}', () => {
			expect(string12hr.increment.hrs.toObject('12:30 PM')).to.equal({
				hrs: 1,
				min: 30,
				mode: 'PM',
			})
		})
		it('11:00 PM => {hrs:12, min:0, mode:AM}', () => {
			expect(string12hr.increment.hrs.toObject('11:00 PM')).to.equal({
				hrs: 12,
				min: 0,
				mode: 'AM',
			})
		})
	})
})
