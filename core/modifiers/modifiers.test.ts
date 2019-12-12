import { string12hr, string24hr, object12hr } from './modifiers'

describe('Modify initial string values', () => {
	//////////////////////////////////////////

	describe('Increment 12hr hours', () => {
		it('09:00 AM => 10:00 AM', () => {
			expect(string12hr.increment.hrs('09:00 AM')).to.equal('10:00 AM')
		})
		it('12:30 PM => 01:30 PM', () => {
			expect(string12hr.increment.hrs('12:30 PM')).to.equal('01:30 PM')
		})
		it('11:00 PM => 12:00 AM', () => {
			expect(string12hr.increment.hrs('11:00 PM')).to.equal('12:00 AM')
		})
	})

	describe('Increment 24hr hours', () => {
		it('09:00 => 10:00', () => {
			expect(string24hr.increment.hrs('09:00')).to.equal('10:00')
		})
		it('12:30 => 13:30', () => {
			expect(string24hr.increment.hrs('12:30')).to.equal('13:30')
		})
		it('23:00 => 00:00', () => {
			expect(string24hr.increment.hrs('23:00')).to.equal('00:00')
		})
	})

	describe('Increment object hours', () => {
		it('{hrs:9, min:0, mode:AM} => {hrs:10, min:0, mode:AM}', () => {
			expect(
				object12hr.increment.hrs({
					hrs: 9,
					min: 0,
					mode: 'AM',
				}),
			).to.equal({
				hrs: 10,
				min: 0,
				mode: 'AM',
			})
		})
		it('{hrs:12, min:30, mode:PM} => {hrs:1, min:30, mode:PM}', () => {
			expect(
				object12hr.increment.hrs({
					hrs: 12,
					min: 30,
					mode: 'PM',
				}),
			).to.equal({
				hrs: 1,
				min: 30,
				mode: 'PM',
			})
		})
		it('{hrs:11, min:0, mode:PM} => {hrs:12, min:0, mode:AM}', () => {
			expect(
				object12hr.increment.hrs({ hrs: 11, min: 0, mode: 'PM' }),
			).to.equal({
				hrs: 12,
				min: 0,
				mode: 'AM',
			})
		})
	})
})
