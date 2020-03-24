export interface A11y {
	create: (document: Document) => HTMLDivElement
	update: (
		$input: HTMLInputElement,
		announcementArray: Array<'initial' | 'select' | 'update'>,
		document: Document
	) => string
}
