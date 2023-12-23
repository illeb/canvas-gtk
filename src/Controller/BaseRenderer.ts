export type RendererConfig = {
	id?: string;
	extraClassNames?: string[];
	style?: string;
};

export class BaseRenderer {
	public readonly canvas: HTMLCanvasElement;
	constructor(public readonly config: RendererConfig = {}) {
		this.canvas = document.createElement('canvas');
		this.canvas.id = config.id ?? 'canvas-gtk';

		if (config.extraClassNames) {
			this.canvas.classList.add(...config.extraClassNames);
		}

		if (config.style) {
			this.canvas.style.cssText = config.style;
		}

		// The code below is only for testing purposes
		const context = this.canvas.getContext('2d');
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
					context!.drawImage(spritesheet, 0, 0);

					sprites.forEach(
						(sprite, index) => {
							context!.drawImage(sprite, index * 16, 100);
						},
					);
				},
			);
		};
	}
}
