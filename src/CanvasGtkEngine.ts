import {BaseRenderer} from './Controller/BaseRenderer.ts';

export class HostElementNotFoundException extends Error {}

export class CanvasGtkEngine {
	baseRenderer: BaseRenderer;
	constructor(hostId: string) {
		this.baseRenderer = new BaseRenderer();

		const hostElement = document.querySelector<HTMLButtonElement>(`#${hostId}`);
		if (!hostElement) {
			throw new HostElementNotFoundException();
		}

		hostElement.append(this.baseRenderer.canvas);
	}
}
