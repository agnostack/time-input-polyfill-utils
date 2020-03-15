import cyPromise from 'cypress-promise'
import { inputID, inputPreFilledID } from "./staticTestValues"

interface LoadedPage {
	$input: HTMLInputElement
	$inputPreFilled: HTMLInputElement
	document: Document
	window: Window
}

export const loadTestPage = (htmlFilePath: string = './cypress/test-file.html'): Promise<LoadedPage> => {
	return cyPromise(cy.visit(htmlFilePath)).then((contentWindow: Window) => {
		let { document } = contentWindow
		const $input = <HTMLInputElement>document.getElementById(inputID)
		const $inputPreFilled = <HTMLInputElement>document.getElementById(inputPreFilledID)
		return { $input, $inputPreFilled, document, window: contentWindow }
	})
}
