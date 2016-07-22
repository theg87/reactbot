import logger from '../util/logger';

const reactbotLogger = logger('Reactbot');

// Cardinal directions in degrees
const NORTH = 0;
const EAST = 90;
const SOUTH = 180;
const WEST = 270;

export default class Reactbot {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.rotation = NORTH;
    this.room = null;
    this.translate = null;
    this.debug = false;
  }

  /**
   * Configures object
   * @param {Object}
   */
  configure({ room, translate, debug }) {
    this.debug = debug;
    this.rotation = NORTH;
    this.room = room;
    this.translate = translate;

    const startPosition = room.getStartPosition();
    this.x = startPosition.x;
    this.y = startPosition.y;
  }

  /**
   * Executes instructions
   * @param {String} instructions
   * @return {String}
   */
  execute(instructions) {
    for (let i = 0, len = instructions.length; i < len; i++) {
      const instruction = instructions.charAt(i);

      switch (this.translate(instruction)) {
        case 'F':
          this.moveForward();
          break;
        case 'L':
          this.turnLeft();
          break;
        case 'R':
          this.turnRight();
          break;
        default:
          this.log(`Did not understand instruction '${instruction}'`);
      }
    }

    return this.getReport(this.x, this.y, this.rotation);
  }

  log(message) {
    if (this.debug) reactbotLogger(message);
  }

  /**
   * Moves Reactbot forward unless a wall is in its way
   */
  moveForward() {
    const newPosition = { x: this.x, y: this.y };

    switch (this.rotation) {
      case NORTH:
        newPosition.y--;
        break;
      case EAST:
        newPosition.x++;
        break;
      case SOUTH:
        newPosition.y++;
        break;
      case WEST:
        newPosition.x--;
        break;
      default:
        break;
    }

    if (this.room.contains(newPosition)) {
      this.x = newPosition.x;
      this.y = newPosition.y;
      this.log(`Moving to position ${this.x} ${this.y}`);
    } else {
      this.log('Reached a wall. I\'m a robot, not a ghost!');
    }
  }

  /**
   * Rotates Reactbot to the left
   */
  turnLeft() {
    if (this.rotation === NORTH) {
      this.rotation = WEST;
    } else {
      this.rotation -= 90;
    }

    if (this.debug) this.log(`Turning left, now facing ${this.getCardinalDirection(this.rotation)}`);
  }

  /**
   * Rotates Reactbot to the right
   */
  turnRight() {
    if (this.rotation === WEST) {
      this.rotation = NORTH;
    } else {
      this.rotation += 90;
    }

    if (this.debug) this.log(`Turning right, now facing ${this.getCardinalDirection(this.rotation)}`);
  }

  /**
   * Returns degrees of rotation as cardinal direction
   * @param {Number} rotation
   * @param {Boolean} shortcode
   * @return {String}
   */
  getCardinalDirection(rotation, shortcode) {
    let cardinalDirection;

    switch (rotation) {
      case NORTH:
        cardinalDirection = shortcode ? 'N' : 'north';
        break;
      case EAST:
        cardinalDirection = shortcode ? 'E' : 'east';
        break;
      case SOUTH:
        cardinalDirection = shortcode ? 'S' : 'south';
        break;
      case WEST:
        cardinalDirection = shortcode ? 'W' : 'west';
        break;
      default:
        cardinalDirection = shortcode ? 'N' : 'north';
    }

    return cardinalDirection;
  }

  /**
   * Returns description of final position and direction
   * @param {Number} x
   * @param {Number} y
   * @param {Number} rotation
   * @return {String}
   */
  getReport(x, y, rotation) {
    const cardinalDirection = this.getCardinalDirection(rotation, true);
    const finalReport = `${x} ${y} ${cardinalDirection}`;

    reactbotLogger(`Final report: ${finalReport}`);

    return finalReport;
  }
}
