import cyPromise from 'cypress-promise'
import { inputID, inputPreFilledID } from './staticTestValues'

interface LoadedPageProps {
	$input: HTMLInputElement
	$inputPreFilled: HTMLInputElement
	document: Document
	window: Window
}

export type LoadedPage = Promise<LoadedPageProps>

export const loadTestPage = (htmlFilePath = './cypress/test-file.html'): LoadedPage => {
	return cyPromise(cy.visit(htmlFilePath)).then((contentWindow: Window) => {
		const { document } = contentWindow
		const $input = <HTMLInputElement>document.getElementById(inputID)
		const $inputPreFilled = <HTMLInputElement>document.getElementById(inputPreFilledID)
		return { $input, $inputPreFilled, document, window: contentWindow }
	})
}
