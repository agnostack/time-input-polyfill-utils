export default function loadJS(src: string, callback: Function): void {
	const script = document.createElement('script')
	script.src = src
	script.onload = (): any => callback()
	document.head.appendChild(script)
}
