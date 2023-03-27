export const failTest = (test: Function, expectedMessage: string): void => {
	try {
		test()
		throw new Error('FAIL')
	} catch (error) {
		if (error instanceof Error) {
			expect(error.message).to.equal(expectedMessage)
		}
	}
}
