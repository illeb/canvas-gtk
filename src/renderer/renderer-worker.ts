let canvasWorker: OffscreenCanvas;
let ctxWorker: OffscreenCanvasRenderingContext2D;
let toDraw: ImageToDraw[] = [];

self.onmessage = (evt: MessageEvent<RenderWorkerConfig> | MessageEvent<RenderWorkerCommandMessage>) => {
	if (evt.data instanceof InitCanvasMessageCommand) {
		const {canvas} = evt.data;
		canvasWorker = canvas;
		ctxWorker = canvas.getContext('2d')!;

		requestAnimationFrame(render);
		self.onmessage = (event: MessageEvent<number>) => {
			self.postMessage(event.data + 1);
		};
	}

	if (evt.data instanceof DrawImagesMessageCommand) {
		const {images} = evt.data;
		toDraw = toDraw.concat(images);
	}
};

function render(time: DOMHighResTimeStamp) {
	// Perform some drawing using the gl context
	redrawOffscreenCanvas(time.toPrecision());

	requestAnimationFrame(render);
}

function redrawOffscreenCanvas(time: string) {
	ctxWorker.clearRect(0, 0, canvasWorker.width, canvasWorker.height);
	ctxWorker.font = '24px Verdana';
	ctxWorker.textAlign = 'center';
	ctxWorker.fillStyle = 'lightblue';
	ctxWorker.fillText(time, canvasWorker.width / 2, canvasWorker.height / 2);
	// The code below is only for testing purposes
	toDraw.forEach(
		({image, dx, dy}) => {
			ctxWorker.drawImage(image, dx, dy);
		},
	);
}

// FIXME: we should move those types in a separate file
export type ImageToDraw = {
	image: ImageBitmap;
	dx: number;
	dy: number;
};

export type RenderWorkerConfig = {
	canvas: OffscreenCanvas;
};

type RenderWorkerCommandMessage = {
	/* FIXME: can't create a empty interface or a empty type, so we need to add a dummy field
 	need to find a better way to do that */
	damnYouEslint: boolean;
};

export class InitCanvasMessageCommand implements RenderWorkerCommandMessage {
	damnYouEslint: boolean;
	canvas: OffscreenCanvas;
	constructor(canvas: OffscreenCanvas) {
		this.damnYouEslint = true;
		this.canvas = canvas;
	}
}

export class DrawImagesMessageCommand implements RenderWorkerCommandMessage {
	damnYouEslint: boolean;
	images: ImageToDraw[];
	constructor(images: ImageToDraw[]) {
		this.damnYouEslint = true;
		this.images = images;
	}
}
