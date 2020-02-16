import { inputID } from "./staticTestValues"

interface LoadedPage {
	$input: HTMLInputElement
	document: Document
	window: Window
}

export const loadInputElement = (): Promise<LoadedPage> => new Promise((resolve) => {
	cy.visit('./cypress/test-file.html')
		.then((contentWindow: Window) => {
			let { document } = contentWindow
			const $input = <HTMLInputElement>document.getElementById(inputID)
			resolve({ $input, document, window: contentWindow })
		})
})
