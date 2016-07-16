import logger from '../util/logger';

const reactbotLogger = logger('Reactbot');

// Cardinal directions in degrees
const NORTH = 0;
const EAST = 90;
const SOUTH = 180;
const WEST = 270;

export default class Reactbot {
  constructor() {
    this.language = 'sv';
    this.x = 0;
    this.y = 0;
    this.rotation = NORTH;
    this.room = null;
    this.debug = false;
  }

  configure({ language, room, debug }) {
    this.language = language;
    this.debug = debug;
    this.rotation = NORTH;
    this.room = room;

    const startPosition = room.getStartPosition();
    this.x = startPosition.x;
    this.y = startPosition.y;
  }

  readInstructions(instructions) {
    for (let i = 0, len = instructions.length; i < len; i++) {
      const instruction = instructions.charAt(i);

      if (
        (this.language === 'sv' && instruction === 'G') ||
        (this.language === 'en' && instruction === 'F')
      ) {
        this.moveForward();
      } else if (
        (this.language === 'sv' && instruction === 'V') ||
        (this.language === 'en' && instruction === 'L')
      ) {
        this.rotate('left');
      } else if (
        (this.language === 'sv' && instruction === 'H') ||
        (this.language === 'en' && instruction === 'R')
      ) {
        this.rotate('right');
      }
    }

    return this.report(this.x, this.y, this.rotation);
  }

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
      if (this.debug) reactbotLogger(`Moving to position ${this.x} ${this.y}`);
    } else {
      if (this.debug) reactbotLogger('Reached a wall. I\'m a robot, not a ghost!');
    }
  }

  rotate(direction) {
    if (direction === 'left') {
      if (this.rotation === NORTH) {
        this.rotation = WEST;
      } else {
        this.rotation -= 90;
      }
    } else if (direction === 'right') {
      if (this.rotation === WEST) {
        this.rotation = NORTH;
      } else {
        this.rotation += 90;
      }
    }

    if (this.debug) reactbotLogger(`Turning ${direction}, now facing ${this.getCardinalDirection(this.rotation)}`);
  }

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

  report(x, y, rotation) {
    const cardinalDirection = this.getCardinalDirection(rotation, true);
    const finalReport = `${x} ${y} ${cardinalDirection}`;

    if (this.debug) reactbotLogger(`Final report: ${finalReport}`);

    return finalReport;
  }
}
