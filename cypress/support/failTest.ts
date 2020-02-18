/* global expect */

export const failTest = (test: Function, expectedMessage: string) => {
	try {
		test()
		throw new Error('FAIL')
	} catch (error) {
		expect(error.message).to.equal(expectedMessage)
	}
}
