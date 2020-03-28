export const failTest = (test: Function, expectedMessage: string): void => {
	try {
		test()
		throw new Error('FAIL')
	} catch (error) {
		expect(error.message).to.equal(expectedMessage)
	}
}
