import test from 'tape';
import Room from './Room';

global.alert = () => {};

test('Room', t => {
  t.test('will have configurable startPosition property with default values', t => {
    let room = new Room();

    t.deepEqual(room.getStartPosition(), { x: 1, y: 1 }, 'Square room has correct default value');

    room = new Room('circular');

    t.deepEqual(room.getStartPosition(), { x: 0, y: 0 }, 'Circular room has correct default value');
    
    const startPosition = { x: 3, y: 5 };

    room = new Room('square', 5, startPosition);

    t.deepEqual(room.getStartPosition(), startPosition, 'Property startPosition is configured correctly');

    t.end();
  });

  t.test('will contain correct points', t => {
    t.comment('square room, size 2x2');

    let room = new Room('square', 2);

    let expectedPoints = [
      { x: 1, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 2 }
    ];

    expectedPoints.forEach(point => {
      t.ok(room.contains(point), `Contains point (${point.x}, ${point.y})`);
    });

    let unexpectedPoints = [
      { x: 2, y: 3 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 3 },
    ];

    unexpectedPoints.forEach(point => {
      t.notOk(room.contains(point), `Does not contain point (${point.x}, ${point.y})`);
    });

    t.comment('circular room, radius 5');

    room = new Room('circular', 5);

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

    t.end();
  });

  t.test('will throw error if provided arguments are invalid', t => {
    t.throws(() => new Room('triangle'), 'Throws error when passing invalid shape');
    t.throws(() => new Room('square', 0), 'Throws error when passing 0 as size');
    t.throws(() => new Room('square', -1), 'Throws error when passing negative size');
    t.throws(() => new Room('square', 101), 'Throws error when passing size larger than 100');
    t.throws(() => new Room('square', 'abc'), 'Throws error when passing a string as size');
    t.throws(() => new Room('square', 2, { x: 0, y: 1 }), 'Throws error when passing invalid startPosition (square room)');
    t.throws(() => new Room('circular', 3, { x: 4, y: -5 }), 'Throws error when passing invalid startPosition (circular room)');

    t.end();
  });
});
