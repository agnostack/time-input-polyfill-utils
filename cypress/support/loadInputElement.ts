import { inputID } from "./staticTestValues"

export const loadInputElement = (): Promise<HTMLInputElement> => new Promise((resolve) => {
	cy.visit('./cypress/test-file.html')
		.then((contentWindow: Window) => {
			let { document } = contentWindow
			const $input = <HTMLInputElement>document.getElementById(inputID)
			resolve($input)
		})
})
