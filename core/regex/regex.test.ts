import { regex } from './regex'

const regexTest = (
	timeString: string,
	regEx: RegExp,
	expectedArray: Array<string> | null,
): void => {
	const testName = timeString || '<empty string>'
	describe(testName, () => {
		if (expectedArray === null) {
			it(`${testName} does NOT match`, () => {
				expect(regEx.exec(timeString)).to.be.null
			})
		} else {
			it(`${testName} matches`, () => {
				expect(timeString).to.match(regEx)
			})
			it(`${testName} has correct results`, () => {
				expect([...regEx.exec(timeString)]).to.deep.equal(expectedArray)
			})
		}
	})
}

describe('Successful regex matches', () => {
	describe('12hr regex', () => {
		regexTest('12:30 AM', regex.string12hr, ['12:30 AM', '12', '30', 'AM'])
		regexTest('2:00 PM', regex.string12hr, ['2:00 PM', '2', '00', 'PM'])
		regexTest('--:-- --', regex.string12hr, ['--:-- --', '--', '--', '--'])
	})

	describe('24hr regex', () => {
		regexTest('12:30', regex.string24hr, ['12:30', '12', '30'])
		regexTest('02:00', regex.string24hr, ['02:00', '02', '00'])
		regexTest('', regex.string24hr, ['', undefined, undefined])
	})
})

describe('Failed regex matches', () => {
	describe('12hr regex', () => {
		regexTest('12:30AM', regex.string12hr, null)
		regexTest('2:0 PM', regex.string12hr, null)
		regexTest('', regex.string12hr, null)
	})

	describe('24hr regex', () => {
		regexTest('1230', regex.string24hr, null)
		regexTest('2:00', regex.string24hr, null)
		regexTest('02:0', regex.string24hr, null)
		regexTest('0:0', regex.string24hr, null)
		regexTest('--:--', regex.string24hr, null)
	})
})
