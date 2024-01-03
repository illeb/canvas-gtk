export function setupRender(canvas: HTMLCanvasElement) {
	const offscreen = canvas.transferControlToOffscreen();
	const worker = new Worker(new URL('./renderer-worker.ts', import.meta.url), {
		type: 'module',
	});
	worker.postMessage({canvas: offscreen}, [offscreen]);
	return worker;
}
