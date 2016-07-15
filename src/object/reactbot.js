import room from './room';

// Cardinal directions in degrees
const NORTH = 0;
const EAST = 90;
const SOUTH = 180;
const WEST = 270;

class Reactbot {
  constructor() {
    this.language = 'sv';
    this.x = 0;
    this.y = 0;
    this.rotation = NORTH;
  }

  init(settings) {
    this.language = settings.language;
    this.rotation = NORTH;

    const startPosition = room.getStartPosition();
    this.x = startPosition.x;
    this.y = startPosition.y;

    this.readInstructions(settings.instructions);

    return this.report(this.x, this.y, this.rotation);
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

    if (room.contains(newPosition)) {
      this.x = newPosition.x;
      this.y = newPosition.y;
    } else {
      console.log('Reached a wall');
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
  }

  getCardinalDirection(rotation) {
    let shortCode;

    switch (rotation) {
      case NORTH:
        shortCode = 'N';
        break;
      case EAST:
        shortCode = 'E';
        break;
      case SOUTH:
        shortCode = 'S';
        break;
      case WEST:
        shortCode = 'W';
        break;
      default:
        shortCode = 'N';
    }

    return shortCode;
  }

  report(x, y, rotation) {
    const cardinalDirection = this.getCardinalDirection(rotation);
    return `${x} ${y} ${cardinalDirection}`;
  }
}

export default new Reactbot();
