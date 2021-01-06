import { useState } from 'react';

/** basic form logic */
const useFormData = (fields, defaults = {}) => {
  /** 
   * initialize state to object with form fields as keys and 
   * { value, error } as values
   */
  const initialState = Object.fromEntries(
    fields.map(field => [field, {
      value: String(defaults[field] || ''),
      error: null
    }])
  );

  const clearedState = Object.fromEntries(
    fields.map(field => [field, { value: '', error: null }])
  );

  const [formData, setFormData] = useState(initialState);

  const resetForm = () => setFormData(clearedState);
  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData(formData => {
      return { ...formData, [name]: { value, error: null } };
    });
  }

  const addError = (field, error) => {
    setFormData(formData => {
      return { ...formData, [field]: { ...formData[field], error } };
    });
  }

  return [formData, updateFormData, addError, resetForm];
}

export default useFormData;