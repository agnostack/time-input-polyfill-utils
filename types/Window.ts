declare global {
	interface Window {
		// TO DO: URGENT! need to figure out how to apply all the types information to this
		timeInputPolyfillUtils: any,
		supportsTime?: boolean
	}
}

// Needed for telling Typescript that this file can be imported
export default {};
