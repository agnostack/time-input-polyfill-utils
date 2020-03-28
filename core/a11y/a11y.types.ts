export interface A11yCreate {
	(document: Document): HTMLDivElement
}

export interface A11yUpdate {
	(
		$input: HTMLInputElement,
		announcementArray: Array<'initial' | 'select' | 'update'>,
		document: Document
	): string
}
