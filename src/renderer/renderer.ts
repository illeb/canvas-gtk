import ViteWorker from './renderer-worker.ts?worker';

export function setupRender(canvas: HTMLCanvasElement) {
	const offscreen = canvas.transferControlToOffscreen();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
	const tsWorker = new ViteWorker();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	tsWorker.postMessage({canvas: offscreen}, [offscreen]);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return tsWorker;
}
