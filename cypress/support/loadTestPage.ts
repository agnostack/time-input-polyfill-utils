import { inputID, inputPreFilledID } from "./staticTestValues"

interface LoadedPage {
	$input: HTMLInputElement
	$inputPreFilled: HTMLInputElement
	document: Document
	window: Window
}

export const loadTestPage = (htmlFilePath: string = './cypress/test-file.html'): Promise<LoadedPage> => new Promise((resolve) => {
	cy.visit(htmlFilePath)
		.then((contentWindow: Window) => {
			let { document } = contentWindow
			const $input = <HTMLInputElement>document.getElementById(inputID)
			const $inputPreFilled = <HTMLInputElement>document.getElementById(inputPreFilledID)
			resolve({ $input, $inputPreFilled, document, window: contentWindow })
		})
})
