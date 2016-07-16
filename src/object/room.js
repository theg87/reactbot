import _some from 'lodash/some';

export default class Room {
  constructor(shape = 'square', size = 1, startPosition) {
    if (isNaN(size)) {
      throw new Error(`Expects size to be a number, got ${size}`);
    }

    if (shape !== 'square' && shape !== 'circular') {
      throw new Error(`Expects shape to be either 'square' or 'circular', got '${shape}'`);
    }

    this.startPosition = startPosition || (shape === 'square' ? { x: 1, y: 1 } : { x: 0, y: 0 });
    this.points = this.setPoints({ shape, size });
  }

  setPoints(settings) {
    const { shape } = settings;
    const points = [];

    if (shape === 'square') {
      const { size } = settings;
      for (let x = 1; x <= size; x++) {
        for (let y = 1; y <= size; y++) {
          points.push({ x, y });
        }
      }
    } else if (shape === 'circular') {
      // Calculate what points are inside the circular room
      // http://codepen.io/anon/pen/rLpJrq
      const radius = settings.size;
      const size = radius * 2;
      const center = size / 2 - 1;

      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          const isInside = Math.pow((x - center), 2) + Math.pow((y - center), 2) < Math.pow(radius, 2);
          if (isInside) points.push({ x: x - radius + 1, y: y - radius + 1 });
        }
      }
    }

    return points;
  }

  getStartPosition() {
    return this.startPosition;
  }

  contains(point) {
    return _some(this.points, point);
  }
}
