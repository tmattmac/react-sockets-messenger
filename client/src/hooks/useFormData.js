import { useState } from 'react';

/** basic form logic */
const useFormData = (fields, defaults = {}) => {
  /** 
   * initialize state to object with form fields as keys and 
   * { value, error } as values
   */
  const initialState = Object.fromEntries(
    fields.map(field => [field, String(defaults[field] || '')])
  );

  const clearedState = Object.fromEntries(
    fields.map(field => [field, ''])
  );

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(clearedState);

  const resetForm = () => setFormData(clearedState);
  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData(formData => {
      return { ...formData, [name]: value };
    });
    // clear errors on change
    setErrors(errors => {
      return { ...errors, [name]: '' };
    });
  }

  const addError = (field, error) => {
    setErrors(errors => {
      return { ...errors, [field]: error };
    });
  }

  return [formData, updateFormData, errors, addError, resetForm];
}

export default useFormData;