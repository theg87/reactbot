import debug from 'debug';

export default function logger(namespace) {
  const myLogger = debug(namespace);

  return message => {
    myLogger(message);
  };
}
