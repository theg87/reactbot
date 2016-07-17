/**
 * Returns translated string
 * @param {String} string
 * @param {String} language
 * @return {String}
 */
export default function translate(string, language) {
  if (language !== 'sv' || typeof string !== 'string') {
    return typeof string === 'string' ? string : '';
  }

  let translatedString;

  switch (string) {
    case 'F':
      translatedString = 'G';
      break;
    case 'L':
      translatedString = 'V';
      break;
    case 'R':
      translatedString = 'H';
      break;
    default:
      translatedString = string;
  }

  return translatedString || '';
}
