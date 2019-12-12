import { get_values } from './getters'

describe('get_values', () => {
	it('expects 12:30 PM => {hrs:12,min:30,mode:PM}', () => {
		expect(get_values('12:30 PM')).to.deep.equal({
			hrs: 12,
			min: 30,
			mode: 'PM',
		})
	})
	it('expects 08:30 AM => {hrs:8,min:30,mode:AM}', () => {
		expect(get_values('08:30 AM')).to.deep.equal({
			hrs: 8,
			min: 30,
			mode: 'AM',
		})
	})
})
