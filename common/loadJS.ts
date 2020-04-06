import '../types/Window'

const alreadyCalledSources: Array<string> = []

export default function loadJS(src: string, callback: Function): void {
	if (alreadyCalledSources.indexOf(src) < 0) {
		alreadyCalledSources.push(src)
		const script = document.createElement('script')
		script.src = src
		script.onload = (): any => callback()
		document.head.appendChild(script)
	}
}
