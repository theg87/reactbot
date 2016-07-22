import logger from '../util/logger';

const roomLogger = logger('Room');

class Room {
  constructor(size = 1, startPosition = { x: 0, y: 0 }, debug = false) {
    if (size !== 'infinite' && (isNaN(size) || size < 1)) {
      const errorMessage = `Expects size to be 'infinite' or a number greater than 0, got ${size}`;
      alert(errorMessage);
      throw new Error(errorMessage);
    }

    this.startPosition = startPosition;
    this.size = size;

    if (debug) {
      roomLogger(`Creating a room of size ${size} with start position ${startPosition.x} ${startPosition.y}`);
    }
  }

  /**
   * Returns start position as a point object
   * @return {Object}
   */
  getStartPosition() {
    return this.startPosition;
  }
}

export class SquareRoom extends Room {
  constructor(size = 1, startPosition = { x: 0, y: 0 }, debug = false) {
    super(size, startPosition, debug);

    if (!this.contains(startPosition)) {
      const errorMessage = `Start position ${startPosition.x} ${startPosition.y} is not within the room's boundaries`;
      alert(errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Returns whether the room contains a specific point or not
   * @param {Object} point
   * @return {Boolean}
   */
  contains(point) {
    if (this.size === 'infinite') return point.x > -1 && point.y > -1;
    return point.x > -1 && point.x < this.size && point.y > -1 && point.y < this.size;
  }
}

export class CircularRoom extends Room {
  constructor(size = 1, startPosition = { x: 0, y: 0 }, debug = false) {
    super(size, startPosition, debug);

    if (!this.contains(startPosition)) {
      const errorMessage = `Start position ${startPosition.x} ${startPosition.y} is not within the room's boundaries`;
      alert(errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Returns whether the room contains a specific point or not
   * @param {Object} point
   * @return {Boolean}
   */
  contains(point) {
    if (this.size === 'infinite') return true;

    const radius = this.size;
    const center = radius - 1;
    const x = point.y + radius - 1;
    const y = point.x + radius - 1;

    // Calculate whether the point is inside the room
    // http://codepen.io/anon/pen/rLpJrq
    return Math.pow((x - center), 2) + Math.pow((y - center), 2) < Math.pow(radius, 2);
  }
}
