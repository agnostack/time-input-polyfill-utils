import { modify12hrString } from './modifiers'

describe('Modify initial string values', () => {
	describe('Increment hours to string', () => {
		it('09:00 AM => 10:00 AM', () => {
			expect(
				modify12hrString.increment.hrs.toString('09:00 AM'),
			).to.equal('10:00 AM')
		})
		it('12:30 PM => 01:30 PM', () => {
			expect(
				modify12hrString.increment.hrs.toString('12:30 PM'),
			).to.equal('01:30 PM')
		})
		it('11:00 PM => 12:00 AM', () => {
			expect(
				modify12hrString.increment.hrs.toString('11:00 PM'),
			).to.equal('12:00 AM')
		})
	})

	describe('Increment hours to object', () => {
		it('09:00 AM => {hrs:10, min:0, mode:AM}', () => {
			expect(
				modify12hrString.increment.hrs.toObject('09:00 AM'),
			).to.equal({ hrs: 10, min: 0, mode: 'AM' })
		})
		it('12:30 PM => {hrs:1, min:30, mode:PM}', () => {
			expect(
				modify12hrString.increment.hrs.toObject('12:30 PM'),
			).to.equal({ hrs: 1, min: 30, mode: 'PM' })
		})
		it('11:00 PM => {hrs:12, min:0, mode:AM}', () => {
			expect(
				modify12hrString.increment.hrs.toObject('11:00 PM'),
			).to.equal({ hrs: 12, min: 0, mode: 'AM' })
		})
	})
})
