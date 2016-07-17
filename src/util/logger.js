const colors = [
  '#f44336',
  '#00acc1',
  '#7cb342',
  '#607d8b',
  '#9c27b0',
];

let counter = 0;

/**
 * Returns logging function
 * @param {String} namespace
 * @return {Function}
 */
export default function logger(namespace = 'Default') {
  // Reset counter if it exceeds the length of the colors array
  // (minus 1 because zero-based)
  if (counter > colors.length - 1) counter = 0;

  const color = colors[counter++];

  /**
   * Logs message and optional extra parameter in the browser's console
   * @param {String} message
   * @param {Any} extraParam
   */
  return (message, extraParam = '') => {
    if (message) {
      console.log(`%c ${namespace}:`, `color: ${color}; font-weight: bold;`, message, extraParam);
    }
  };
}
