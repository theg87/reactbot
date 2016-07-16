import test from 'tape';
import Room from './Room';

test('Room', t => {
  t.test('will have configurable startPosition property with default values', t => {
    let room = new Room();

    t.deepEqual(room.getStartPosition(), { x: 1, y: 1 }, 'Square room has correct default value');

    room = new Room('circular');

    t.deepEqual(room.getStartPosition(), { x: 0, y: 0 }, 'Circular room has correct default value');
    
    const startPosition = { x: 3, y: 5 };

    room = new Room('square', 1, startPosition);

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
});
