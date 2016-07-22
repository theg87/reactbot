import test from 'tape';
import Reactbot from './Reactbot';
import { SquareRoom, CircularRoom } from './Room';
import translate from '../util/translate';

const reactbot = new Reactbot();

test('Reactbot', t => {
  t.test('will have configurable language, room and debug properties', t => {
    const room = new CircularRoom();
    const debug = true;

    t.equal(reactbot.room, null, 'Has correct room default value');
    t.equal(reactbot.translate, null, 'Has correct translate default value');
    t.equal(reactbot.debug, false, 'Has correct debug default value');

    reactbot.configure({
      translate: translate('sv'),
      room,
      debug,
    });

    t.notEqual(reactbot.room, null, 'Has configurable room property');
    t.notEqual(reactbot.translate, null, 'Has configurable translate property');
    t.equal(reactbot.debug, true, 'Has configurable debug property');

    t.end();
  });

  t.test('will read and execute a string of instructions', t => {
    let room = new SquareRoom(5, { x: 1, y: 2 });
    reactbot.configure({ room, translate: translate('sv') });
    t.equal(reactbot.execute('HGHGGHGHG'), '1 3 N', 'Executes instructions correctly (square room, Swedish)');

    room = new CircularRoom(8, { x: -3, y: 2 });
    reactbot.configure({ room, translate: translate('sv') });
    t.equal(reactbot.execute('VVGHGGHGV'), '-5 2 W', 'Executes instructions correctly (circular room, Swedish)');

    room = new SquareRoom(3, { x: 2, y: 0 });
    reactbot.configure({ room, translate: translate('en') });
    t.equal(reactbot.execute('RFRFFFFRFRRLR'), '1 2 E', 'Executes instructions correctly (square room, English)');

    room = new CircularRoom(10);
    reactbot.configure({ room, translate: translate('en') });
    t.equal(reactbot.execute('RRFLFFLRF'), '3 1 E', 'Executes instructions correctly (circular room, English)');

    room = new SquareRoom(6, { x: 0, y: 4 });
    reactbot.configure({ room, translate: translate('es') });
    t.equal(reactbot.execute('DDAAIAAIAADA'), '3 3 E', 'Executes instructions correctly (square room, Spanish)');

    room = new CircularRoom(4, { x: 1, y: -2 });
    reactbot.configure({ room, translate: translate('es') });
    t.equal(reactbot.execute('IIADAAIDIIAADD'), '1 -1 W', 'Executes instructions correctly (circular room, Spanish)');

    t.end();
  });
});
