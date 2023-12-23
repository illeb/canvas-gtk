export function spritesFromImage(image: HTMLImageElement, config?: SpritesheetConfig) {
  if (!config) {
    return image;
  } else {
    const matrixWidth = image.width / config.spritesWidth;
    const matrixHeight = image.height / config.spritesHeight;
    const metadata = [];
    for (let x = 0; x < matrixWidth; x++) {
      for (let y = 0; y < matrixHeight; y++) {
        metadata.push({
          originX: x * config.spritesWidth,
          originY: y * config.spritesHeight,
          x,
          y,
        });
      }
    }
    return metadata
      .filter(config.filter)
      .map(metadata => createImageBitmap(image, metadata.x, metadata.y, config.spritesWidth, config.spritesHeight));
  }
}

export interface SpritesheetConfig {
  spritesWidth: number,
  spritesHeight: number,
  filter: FilterFn
}

export type FilterFn = (metadata: SpriteMetadata, index: number) => boolean;

export interface SpriteMetadata {
  originX: number,
  originY: number,
  x: number,
  y: number,
  // index: number,
}
