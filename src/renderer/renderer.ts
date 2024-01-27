import RendererWorker from './renderer-worker.ts?worker&inline';
import {DrawImagesMessageCommand, InitCanvasMessageCommand} from './renderer-worker.ts';
import type {ImageToDraw} from './renderer-worker.ts';

export async function setupRender(canvas: HTMLCanvasElement) {
	const offscreen = canvas.transferControlToOffscreen();
	const imagesToDraw = await loadTestImage();
	const tsWorker = new RendererWorker();
	// FIXME: we need to make the web worker type safe: we need to remove those disable eslint

	tsWorker.postMessage(new InitCanvasMessageCommand(offscreen), [offscreen]);

	tsWorker.postMessage(new DrawImagesMessageCommand(imagesToDraw), [offscreen]);
	return tsWorker;
}

async function loadTestImage(): Promise<ImageToDraw[]> {
	const img = new Image();
	let imagesToDraw: ImageToDraw[] = [];
	img.src = 'https://photonstorm.com/wp-content/uploads/2011/09/favicons-smallFFS.gif';
	return new Promise(resolve => {
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
					imagesToDraw = imagesToDraw.concat({image: spritesheet, dx: 0, dy: 0});

					sprites.forEach(
						(sprite, index) => {
							imagesToDraw = imagesToDraw.concat({image: sprite, dx: index * 16, dy: 100});
						},
					);
					resolve(imagesToDraw);
				},
			);
		};
	});
}
