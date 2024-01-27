import ViteWorker from './renderer-worker.ts?worker&inline';

export function setupRender(canvas: HTMLCanvasElement) {
	const offscreen = canvas.transferControlToOffscreen();
	const tsWorker = new ViteWorker();
	tsWorker.postMessage({canvas: offscreen}, [offscreen]);
	return tsWorker;
}
