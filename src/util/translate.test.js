import test from 'tape';
import translate from './translate';

test('translate', t => {
  t.test('will return a translated string', t => {
    t.equal(translate('F', 'sv'), 'G', 'Returns translated string (F -> G)');
    t.equal(translate('L', 'sv'), 'V', 'Returns translated string (L -> V)');
    t.equal(translate('R', 'sv'), 'H', 'Returns translated string (R -> H)');
    t.equal(translate('F', 'en'), 'F', 'Returns untranslated string (F -> F)');
    t.equal(translate('L', 'en'), 'L', 'Returns untranslated string (L -> L)');
    t.equal(translate('R', 'en'), 'R', 'Returns untranslated string (R -> R)');
    t.equal(translate('P', 'sv'), 'P', 'Returns untranslated string (P -> P)');
    t.equal(translate('F', 'da'), 'F', 'Returns untranslated string (F -> F)');
    t.equal(translate('F'), 'F', 'Returns untranslated string (F -> F)');
    t.equal(translate(), '', 'Returns empty string');
    t.equal(translate(1), '', 'Returns empty string');
    t.equal(translate({ a: 'a' }), '', 'Returns empty string');
    t.equal(translate([], 'sv'), '', 'Returns empty string');

    t.end();
  });
});
