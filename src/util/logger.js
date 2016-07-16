/**
 * Returns logging function
 * @param {String} namespace
 * @param {String} language
 * @return {Function}
 */
export default function logger(namespace) {
  return message => {
    console.log(`%c ${namespace}`, 'color: #00acc1; font-weight: bold;', message);
  };
}
