import React, {  useState, useCallback } from 'react';
import getContext from '../../contexts/getContext';

const ErrorProvider = ({ children }) => {
  const ErrorContext = getContext('error');
  const SetErrorContext = getContext('setError');
  const [error, setError] = useState({});

  const addError = useCallback((message) => setError({ message }), [setError]);

  return (
    <ErrorContext.Provider value={error}>
      <SetErrorContext.Provider value={addError}>
        {children}
      </SetErrorContext.Provider>
    </ErrorContext.Provider>
  );
}
 
export default ErrorProvider;