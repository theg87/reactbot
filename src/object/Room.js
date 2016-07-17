import _some from 'lodash/some';
import logger from '../util/logger';

const roomLogger = logger('Room');

export default class Room {
  constructor(shape = 'square', size = 1, startPosition, debug = false) {
    if (isNaN(size) || size < 1 || size > 100) {
      const errorMessage = `Expects size to be a number between 1 and 100, got ${size}`;
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    if (shape !== 'square' && shape !== 'circular') {
      const errorMessage = `Expects shape to be either 'square' or 'circular', got '${shape}'`;
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    // Set different default start positions depending on
    // whether the room is square or circular
    this.startPosition = startPosition || (shape === 'square' ? { x: 1, y: 1 } : { x: 0, y: 0 });

    this.points = this.setPoints({ shape, size });

    if (!this.contains(startPosition)) {
      const errorMessage = `Start position ${startPosition.x} ${startPosition.y} is not within the room's boundaries`;
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    if (debug) {
      roomLogger(`Creating ${shape} room of size ${size} with start position ${this.startPosition.x} ${this.startPosition.y}`);
      roomLogger('The room contains these points', this.points);
    }
  }

  /**
   * Returns array of points contained in the room
   * @param {Object} settings
   * @return {Array}
   */
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
          if (isInside) points.push({ x: y - radius + 1, y: x - radius + 1 });
        }
      }
    }

    return points;
  }

  /**
   * Returns start position as a point object
   * @return {Object}
   */
  getStartPosition() {
    return this.startPosition;
  }

  /**
   * Returns whether the room contains a specific point or not
   * @param {Object} point
   * @return {Boolean}
   */
  contains(point) {
    return _some(this.points, point);
  }
}
