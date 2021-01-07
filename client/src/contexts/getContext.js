import { createContext } from 'react';

/** React context factory */

const contexts = {};

const getContext = (key) => {
  if (!contexts[key]) contexts[key] = createContext();
  return contexts[key];
}

export default getContext;