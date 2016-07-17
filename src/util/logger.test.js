import test from 'tape';
import sinon from 'sinon';
import logger from './logger';

console.log = sinon.spy();

test('logger', t => {
  t.test('will return a function that logs messages in the console', t => {
    const namespace = 'Test';
    const message = 'This is a message';
    const extraParam = { a: 'a' };
    const testLogger = logger(namespace);

    t.equal(typeof testLogger, 'function', 'Returns a function');

    t.comment('without extraParam');
    console.log.reset();

    testLogger(message);

    t.equal(console.log.getCall(0).args[0], `%c ${namespace}:`, 'Message logged in the console with correct namespace');
    t.equal(console.log.getCall(0).args[2], message, 'Message logged in the console with correct message');

    t.comment('with extraParam');
    console.log.reset();

    testLogger(message, extraParam);

    t.equal(console.log.getCall(0).args[0], `%c ${namespace}:`, 'Message logged in the console with correct namespace');
    t.equal(console.log.getCall(0).args[2], message, 'Message logged in the console with correct message');
    t.deepEqual(console.log.getCall(0).args[3], extraParam, 'Message logged in the console with correct extra parameter');

    t.comment('with default namespace');
    console.log.reset();

    const testLogger2 = logger();
    testLogger2(message, extraParam);

    t.equal(console.log.getCall(0).args[0], '%c Default:', 'Message logged in the console with default namespace');
    t.equal(console.log.getCall(0).args[2], message, 'Message logged in the console with correct message');
    t.deepEqual(console.log.getCall(0).args[3], extraParam, 'Message logged in the console with correct extra parameter');

    t.end();
  });

  t.test('will not log anything if no message is provided', t => {
    const testLogger = logger('Test');
    console.log.reset();

    testLogger();

    t.equal(console.log.callCount, 0, 'Nothing was logged in the console');
    t.end();
  });

  t.test('will alternate between a fixed set of colors in the console logs', t => {
    const loggers = [
      logger(),
      logger(),
      logger(),
      logger(),
      logger(),
      logger(),
    ];

    const message = 'This is a message';

    const colors = [
      '#f44336',
      '#00acc1',
      '#7cb342',
      '#607d8b',
      '#9c27b0',
    ];

    console.log.reset();

    function getColor(string) {
      return string.split(';')[0].replace('color: ', '');
    }

    let counter = 0;

    for (let i = 0, len = loggers.length; i < len; i++) {
      loggers[i](message);
      if (counter > colors.length - 1) counter = 0;
      const color = colors[counter++];
      t.equal(getColor(console.log.getCall(i).args[1]), color, `Sets correct color (${color})`);
    }

    t.end();
  });
});
