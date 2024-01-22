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
	// The code below is only for testing purposes
	imagesToDraw.forEach(
		({image, dx, dy}) => {
			ctxWorker.drawImage(image, dx, dy);
		},
	);
}

// The code below is only for testing purposes
const imagesToDraw: ImageToDraw[] = [];

function loadTestImage() {
	const img = new Image();
	img.src = 'https://photonstorm.com/wp-content/uploads/2011/09/favicons-smallFFS.gif';
	img.onload = () => {
		void Promise.all([
			createImageBitmap(img),
			createImageBitmap(img, 16, 0, 16, 16),
			createImageBitmap(img, 48, 0, 16, 16),
			createImageBitmap(img, 80, 0, 16, 16),
			createImageBitmap(img, 0, 16, 16, 16),
			createImageBitmap(img, 32, 16, 16, 16),
			createImageBitmap(img, 64, 16, 16, 16),
			createImageBitmap(img, 16, 32, 16, 16),
			createImageBitmap(img, 48, 32, 16, 16),
			createImageBitmap(img, 80, 32, 16, 16),
		]).then(
			([spritesheet, ...sprites]) => {
				imagesToDraw.push({image: spritesheet, dx: 0, dy: 0});

				sprites.forEach(
					(sprite, index) => {
						imagesToDraw.push({image: sprite, dx: index * 16, dy: 100});
					},
				);
			},
		);
	};
}

loadTestImage();

type ImageToDraw = {
	image: ImageBitmap;
	dx: number;
	dy: number;
};

export type RenderWorkerConfig = {
	canvas: OffscreenCanvas;
};
