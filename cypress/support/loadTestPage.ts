import { inputID, inputPreFilledID } from "./staticTestValues"

interface LoadedPage {
	$input: HTMLInputElement
	$inputPreFilled: HTMLInputElement
	document: Document
	window: Window
}

export const loadTestPage = (): Promise<LoadedPage> => new Promise((resolve) => {
	cy.visit('./cypress/test-file.html')
		.then((contentWindow: Window) => {
			let { document } = contentWindow
			const $input = <HTMLInputElement>document.getElementById(inputID)
			const $inputPreFilled = <HTMLInputElement>document.getElementById(inputPreFilledID)
			resolve({ $input, $inputPreFilled, document, window: contentWindow })
		})
})
