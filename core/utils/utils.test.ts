import { toLeadingZero, toNumber, toArray } from './utils'

give_number_leading_zero()
convert_possible_number_to_guaranteed_number()
NodeList_to_array()

function give_number_leading_zero(): void {
	describe('leading zero', () => {
		it('Expect 0 to be "00"', () => {
			expect(toLeadingZero(0)).to.equal('00')
		})
		it('Expect "0" to be "00"', () => {
			expect(toLeadingZero('0')).to.equal('00')
		})
		it('Expect "--" to be "--"', () => {
			expect(toLeadingZero('--')).to.equal('--')
		})
		it('Expect 10 to be "10"', () => {
			expect(toLeadingZero(10)).to.equal('10')
		})
		it('Expect "10" to be "10"', () => {
			expect(toLeadingZero('10')).to.equal('10')
		})
	})
}

function convert_possible_number_to_guaranteed_number(): void {
	describe('convert to number', () => {
		it('Expect "0" to be 0', () => {
			expect(toNumber('0')).to.equal(0)
		})
		it('Expect "--" to be "--"', () => {
			expect(toNumber('--')).to.equal('--')
		})
		it('Expect 0 to be 0', () => {
			expect(toNumber(0)).to.equal(0)
		})
	})
}

function NodeList_to_array(): void {
	describe('NodeList to array', () => {
		it('Expect node element list to become an array of elements', () => {
			const create = () => {
				const div = document.createElement('div')
				div.classList.add('NodeList-test')
				document.querySelector('body').appendChild(div)
				return div
			}
			const elementsArray = [create(), create(), create()]
			const nodeList = document.querySelectorAll('.NodeList-test')
			expect(toArray(nodeList)).to.deep.equal(elementsArray)
		})
	})
}
