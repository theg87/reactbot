import test from 'tape';
import room from './room';

test('Room', t => {
  t.test('will have configurable startPosition property', t => {
    t.deepEqual(room.getStartPosition(), { x: 0, y: 0 }, 'Has correct default values');
    
    const newStartPosition = { x: 3, y: 5 };

    room.configure({
      startPosition: newStartPosition,
    });

    t.deepEqual(room.getStartPosition(), newStartPosition, 'startPosition is configured correctly');

    t.end();
  });

  t.test('will contain correct points', t => {
    const startPosition = { x: 0, y: 0 };

    t.comment('square room, size 2x2');

    room.configure({
      startPosition,
      shape: 'square',
      size: 2,
    });

    let expectedPoints = [
      { x: 1, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 2 }
    ];

    expectedPoints.forEach(point => {
      t.ok(room.contains(point), 'Contains expected point');
    });

    let unexpectedPoints = [
      { x: 2, y: 3 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 3 },
    ];

    unexpectedPoints.forEach(point => {
      t.notOk(room.contains(point), 'Does not contain unexpected point');
    });

    t.comment('circular room, radius 5');

    room.configure({
      startPosition,
      shape: 'circular',
      size: 5,
    });

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
      t.ok(room.contains(point), 'Contains expected point');
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
      t.notOk(room.contains(point), 'Does not contain unexpected point');
    });

    t.end();
  });
});
