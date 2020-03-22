export default function loadJS(src: string, callback: Function) {
	var script = document.createElement('script')
	script.src = src
	script.onload = () => callback()
	document.head.appendChild(script)
}
