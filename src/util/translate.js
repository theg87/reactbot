export default function translate(string, language) {
  if (language === 'en') return string;

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

  return translatedString;
}
