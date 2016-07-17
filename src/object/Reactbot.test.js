import test from 'tape';
import Reactbot from './Reactbot';
import Room from './Room';

const reactbot = new Reactbot();

test('Reactbot', t => {
  t.test('will have configurable language, room and debug properties', t => {
    const room = new Room('circular');
    const language = 'en';
    const debug = true;

    t.equal(reactbot.language, 'sv', 'Has correct language default value');
    t.equal(reactbot.room, null, 'Has correct room default value');
    t.equal(reactbot.debug, false, 'Has correct debug default value');

    reactbot.configure({
      language,
      room,
      debug,
    });

    t.equal(reactbot.language, language, 'Has configurable language property');
    t.notEqual(reactbot.room, null, 'Has configurable room property');
    t.equal(reactbot.debug, true, 'Has configurable debug property');

    t.end();
  });

  t.test('will read and execute a string of instructions', t => {
    let room = new Room('square', 5, { x: 1, y: 2 });
    reactbot.configure({ room, language: 'sv' });
    t.equal(reactbot.execute('HGHGGHGHG'), '1 3 N', 'Executes instructions correctly (square room, Swedish)');

    room = new Room('circular', 8, { x: -3, y: 2 });
    reactbot.configure({ room, language: 'sv' });
    t.equal(reactbot.execute('VVGHGGHGV'), '-5 2 W', 'Executes instructions correctly (circular room, Swedish)');

    room = new Room('square', 3, { x: 3, y: 1 });
    reactbot.configure({ room, language: 'en' });
    t.equal(reactbot.execute('RFRFFFFRFRRLR'), '2 3 E', 'Executes instructions correctly (square room, English)');

    room = new Room('circular', 10);
    reactbot.configure({ room, language: 'en' });
    t.equal(reactbot.execute('RRFLFFLRF'), '3 1 E', 'Executes instructions correctly (circular room, English)');

    t.end();
  });
});
