import _some from 'lodash/some';

class Room {
  constructor() {
    this.startPosition = { x: 0, y: 0 };
    this.points = [];
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

  configure(settings) {
    const { shape, size, startPosition } = settings;
    this.startPosition = startPosition;
    this.points = this.setPoints({ shape, size });
  }

  getStartPosition() {
    return this.startPosition;
  }

  contains(point) {
    return _some(this.points, point);
  }
}

export default new Room();
