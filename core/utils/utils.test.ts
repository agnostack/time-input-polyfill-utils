import { toArray, toLeadingZero, toLeadingZero12HrString, toNumber } from './utils'

give_number_leading_zero()
leading_zero_12hr_string()
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
		it('Expect "-" to be "--"', () => {
			expect(toLeadingZero('-')).to.equal('--')
		})
		it('Expect null to be "--"', () => {
			expect(toLeadingZero(null)).to.equal('--')
		})
		it('Expect 10 to be "10"', () => {
			expect(toLeadingZero(10)).to.equal('10')
		})
		it('Expect "10" to be "10"', () => {
			expect(toLeadingZero('10')).to.equal('10')
		})
	})
}

function leading_zero_12hr_string(): void {
	describe('leading zero 12hr string', () => {
		it('"1:4 PM" => "01:04 PM"', () => {
			expect(toLeadingZero12HrString('1:4 PM')).to.equal('01:04 PM')
		})
		it('"10:45 PM" => "10:45 PM"', () => {
			expect(toLeadingZero12HrString('10:45 PM')).to.equal('10:45 PM')
		})
		it('"-:4 PM" => "--:04 PM"', () => {
			expect(toLeadingZero12HrString('-:4 PM')).to.equal('--:04 PM')
		})
		it('"-:- PM" => "--:-- PM"', () => {
			expect(toLeadingZero12HrString('-:- PM')).to.equal('--:-- PM')
		})
		it('"-:- -" => --:-- --', () => {
			expect(toLeadingZero12HrString('-:- -')).to.equal('--:-- --')
		})
		it('"" => --:-- --', () => {
			expect(toLeadingZero12HrString('')).to.equal('--:-- --')
		})
		it('null => --:-- --', () => {
			expect(toLeadingZero12HrString(null)).to.equal('--:-- --')
		})
	})
}

function convert_possible_number_to_guaranteed_number(): void {
	describe('convert to number', () => {
		it('Expect "0" to be 0', () => {
			expect(toNumber('0')).to.equal(0)
		})
		it('Expect "--" to be "--"', () => {
			expect(toNumber('--')).to.equal(null)
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
