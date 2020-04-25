import { toLeadingZero, toNumber, toArray, flash24hrTime } from './utils'
import { loadTestPage } from '../../cypress/support/loadTestPage'

give_number_leading_zero()
convert_possible_number_to_guaranteed_number()
NodeList_to_array()
flash_24hr_time_test()

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
			const create = (): HTMLDivElement => {
				const div = document.createElement('div')
				div.classList.add('NodeList-test')
				document.querySelector('body')?.appendChild(div)
				return div
			}
			const elementsArray = [create(), create(), create()]
			const nodeList = document.querySelectorAll('.NodeList-test')
			expect(toArray(nodeList)).to.deep.equal(elementsArray)
		})
	})
}

function flash_24hr_time_test(): void {
	describe('Flash 24hr time', () => {
		it('Expect 08:30 PM -> 20:30 -> 08:30 PM', async () => {
			const { $input } = await loadTestPage()
			$input.value = '08:30 PM'
			flash24hrTime($input)
			expect($input.value).to.equal('20:30')
			await new Promise(resolve => {
				setTimeout(() => {
					resolve()
				}, 1)
			})
			expect($input.value).to.equal('08:30 PM')
		})
	})
}
