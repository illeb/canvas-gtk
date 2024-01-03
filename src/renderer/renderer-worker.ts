let canvasWorker: OffscreenCanvas;
let ctxWorker: OffscreenCanvasRenderingContext2D;

onmessage = (evt: MessageEvent<RenderWorkerConfig>) => {
	const {canvas} = evt.data;
	canvasWorker = canvas;
	ctxWorker = canvas.getContext('2d')!;

	function render(time: DOMHighResTimeStamp) {
		// Perform some drawing using the gl context
		redrawOffscreenCanvas(time.toPrecision());

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);
};

function redrawOffscreenCanvas(time: string) {
	ctxWorker.clearRect(0, 0, canvasWorker.width, canvasWorker.height);
	ctxWorker.font = '24px Verdana';
	ctxWorker.textAlign = 'center';
	ctxWorker.fillStyle = 'lightblue';
	ctxWorker.fillText(time, canvasWorker.width / 2, canvasWorker.height / 2);
}

export type RenderWorkerConfig = {
	canvas: OffscreenCanvas;
};
