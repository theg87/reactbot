import test from 'tape';
import { SquareRoom, CircularRoom } from './Room';

global.alert = () => {};

test('Room', t => {
  t.test('will have configurable startPosition property with default values', t => {
    let room = new SquareRoom();
    t.deepEqual(room.getStartPosition(), { x: 0, y: 0 }, 'Square room has correct default value');

    room = new CircularRoom();
    t.deepEqual(room.getStartPosition(), { x: 0, y: 0 }, 'Circular room has correct default value');

    const startPosition = { x: 3, y: 4 };

    room = new SquareRoom(5, startPosition);
    t.deepEqual(room.getStartPosition(), startPosition, 'Property startPosition is configured correctly (square room)');

    room = new CircularRoom(10, startPosition);
    t.deepEqual(room.getStartPosition(), startPosition, 'Property startPosition is configured correctly (circular room)');

    t.end();
  });

  t.test('will have configurable size property with default value', t => {
    let room = new SquareRoom();
    t.equal(room.size, 1, 'Square room has correct default size');

    room = new CircularRoom();
    t.equal(room.size, 1, 'Circular room has correct default size');

    room = new SquareRoom(3);
    t.equal(room.size, 3, 'Property size is configured correctly (square room)');

    room = new SquareRoom(5);
    t.equal(room.size, 5, 'Property size is configured correctly (circular room)');

    room = new SquareRoom('infinite');
    t.equal(room.size, 'infinite', 'Property size is configured correctly (infinite room)');

    t.end();
  });

  t.test('will contain correct points', t => {
    t.comment('square room, size 2x2');

    let room = new SquareRoom(2);

    let expectedPoints = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 }
    ];

    expectedPoints.forEach(point => {
      t.ok(room.contains(point), `Contains point (${point.x}, ${point.y})`);
    });

    let unexpectedPoints = [
      { x: 1, y: 2 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 2 },
    ];

    unexpectedPoints.forEach(point => {
      t.notOk(room.contains(point), `Does not contain point (${point.x}, ${point.y})`);
    });

    t.comment('circular room, radius 5');

    room = new CircularRoom(5);

    expectedPoints = [
      { x: 0, y: 0 },
      { x: -4, y: -2 },
      { x: -4, y: 2 },
      { x: -3, y: -3 },
      { x: -3, y: 3 },
      { x: -2, y: -4 },
      { x: -1, y: -4 },
      { x: 0, y: -4 },
      { x: 1, y: -4 },
      { x: 2, y: -4 },
      { x: 3, y: -3 },
      { x: 4, y: -2 },
      { x: 4, y: 2 },
      { x: 3, y: 3 },
      { x: 2, y: 4 },
      { x: 1, y: 4 },
      { x: 0, y: 4 },
      { x: -1, y: 4 },
      { x: -2, y: 4 },
    ];

    expectedPoints.forEach(point => {
      t.ok(room.contains(point), `Contains point (${point.x}, ${point.y})`);
    });

    unexpectedPoints = [
      { x: -4, y: -3 },
      { x: -3, y: -4 },
      { x: 3, y: -4 },
      { x: 4, y: -3 },
      { x: -5, y: -2 },
      { x: 5, y: 2 },
      { x: 4, y: 3 },
      { x: 3, y: 4 },
      { x: 2, y: 5 },
      { x: -2, y: 5 },
      { x: -3, y: 4 },
      { x: -4, y: 3 },
      { x: -3, y: -4 },
      { x: 2, y: -5 },
    ];

    unexpectedPoints.forEach(point => {
      t.notOk(room.contains(point), `Does not contain point (${point.x}, ${point.y})`);
    });

    t.comment('infinite square room');

    room = new SquareRoom('infinite');

    expectedPoints = [
      { x: 0, y: 0 },
      { x: 24, y: 2 },
      { x: 4000, y: 800 },
      { x: 999999, y: 0 },
      { x: 53468, y: 345769 },
    ];

    expectedPoints.forEach(point => {
      t.ok(room.contains(point), `Contains point (${point.x}, ${point.y})`);
    });

    unexpectedPoints = [
      { x: -4, y: -3 },
      { x: -3, y: -4 },
      { x: -1, y: 0 },
      { x: 1, y: -1 },
    ];

    unexpectedPoints.forEach(point => {
      t.notOk(room.contains(point), `Does not contain point (${point.x}, ${point.y})`);
    });

    t.comment('infinite circular room');

    room = new CircularRoom('infinite');

    expectedPoints = [
      { x: 0, y: 0 },
      { x: 24, y: 2 },
      { x: 4000, y: 800 },
      { x: 999999, y: 0 },
      { x: 53468, y: 345769 },
      { x: -24, y: -2 },
      { x: -4000, y: -800 },
      { x: -999999, y: 0 },
      { x: -53468, y: -345769 },
    ];

    expectedPoints.forEach(point => {
      t.ok(room.contains(point), `Contains point (${point.x}, ${point.y})`);
    });

    t.end();
  });

  t.test('will throw error if provided arguments are invalid', t => {
    t.throws(() => new SquareRoom(0), 'Throws error when passing 0 as size');
    t.throws(() => new SquareRoom(-1), 'Throws error when passing negative size');
    t.throws(() => new SquareRoom('abc'), 'Throws error when passing a string as size');
    t.throws(() => new SquareRoom(2, { x: -1, y: 1 }), 'Throws error when passing invalid startPosition (square room)');
    t.throws(() => new CircularRoom(3, { x: 4, y: -5 }), 'Throws error when passing invalid startPosition (circular room)');

    t.end();
  });
});
