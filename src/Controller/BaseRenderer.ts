import {setupRender} from '../renderer/renderer.ts';

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

		setupRender(this.canvas);
	}
}
