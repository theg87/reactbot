import sv from '../../l10n/sv.json';
import es from '../../l10n/es.json';

/**
 * Returns translate function
 * @param {String} language
 * @return {Function}
 */
export default function translate(language) {
  const defaultLanguage = 'en';
  const strings = { sv, es };

  if (language !== defaultLanguage && !strings[language]) {
    const supportedLanguages = Object.keys(strings).map(key => key).join(', ');
    throw new Error(`Language ${language} is not supported. The supported languages are: ${defaultLanguage}, ${supportedLanguages}`);
  }

  /**
   * Returns translated string
   * @param {String} string
   * @return {String}
   */
  return function translateString(string) {
    if (typeof string !== 'string') return '';
    if (language === defaultLanguage) return string;
    return strings[language][string] || '';
  };
}
