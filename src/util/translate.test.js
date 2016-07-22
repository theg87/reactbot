import test from 'tape';
import translate from './translate';

const translateSv = translate('sv');
const translateEn = translate('en');
const translateEs = translate('es');

test('translate', t => {
  t.test('will return a translate function', t => {
    t.equal(typeof translateSv, 'function', 'Returns translate function');
    t.end();
  });

  t.test('will return a translated string', t => {
    t.equal(translateSv('G'), 'F', 'Returns translated string (sv)');
    t.equal(translateSv('V'), 'L', 'Returns translated string (sv)');
    t.equal(translateSv('H'), 'R', 'Returns translated string (sv)');
    t.equal(translateEn('F'), 'F', 'Returns untranslated string (en)');
    t.equal(translateEn('L'), 'L', 'Returns untranslated string (en)');
    t.equal(translateEn('R'), 'R', 'Returns untranslated string (en)');
    t.equal(translateEs('A'), 'F', 'Returns translated string (es)');
    t.equal(translateEs('I'), 'L', 'Returns translated string (es)');
    t.equal(translateEs('D'), 'R', 'Returns translated string (es)');
    t.equal(translateSv('P'), '', 'Returns empty string');
    t.equal(translateSv('F'), '', 'Returns empty string');
    t.equal(translateSv(), '', 'Returns empty string');
    t.equal(translateEn(1), '', 'Returns empty string');
    t.equal(translateSv({ a: 'a' }), '', 'Returns empty string');
    t.equal(translateEs([]), '', 'Returns empty string');

    t.end();
  });

  t.test('will throw error if language is unsupported', t => {
    t.throws(() => translate('da'), 'Throws if language is unsupported');
    t.end();
  });
});
