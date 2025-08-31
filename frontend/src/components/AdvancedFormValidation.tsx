import React, { useState, useEffect, useCallback } from 'react';
import IconSystem from './IconSystem';

interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

interface FieldValidation {
  [key: string]: ValidationRule[];
}

interface ValidationState {
  [key: string]: {
    isValid: boolean;
    message: string;
    isDirty: boolean;
  };
}

interface AdvancedFormValidationProps {
  fields: {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    validation?: ValidationRule[];
    options?: { value: string; label: string }[];
  }[];
  onSubmit: (data: any) => void;
  submitButtonText?: string;
  initialData?: any;
}

const AdvancedFormValidation: React.FC<AdvancedFormValidationProps> = ({
  fields,
  onSubmit,
  submitButtonText = 'Submit',
  initialData = {}
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [validationState, setValidationState] = useState<ValidationState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Initialize validation state
  useEffect(() => {
    const initialValidation: ValidationState = {};
    fields.forEach(field => {
      initialValidation[field.name] = {
        isValid: true,
        message: '',
        isDirty: false
      };
    });
    setValidationState(initialValidation);
  }, [fields]);

  // Validation functions
  const validateField = useCallback((name: string, value: any): { isValid: boolean; message: string } => {
    const field = fields.find(f => f.name === name);
    if (!field || !field.validation) {
      return { isValid: true, message: '' };
    }

    for (const rule of field.validation) {
      let isValid = true;
      let message = '';

      switch (rule.type) {
        case 'required':
          isValid = value !== undefined && value !== null && value !== '';
          message = isValid ? '' : rule.message;
          break;

        case 'minLength':
          isValid = !value || value.length >= rule.value;
          message = isValid ? '' : rule.message;
          break;

        case 'maxLength':
          isValid = !value || value.length <= rule.value;
          message = isValid ? '' : rule.message;
          break;

        case 'pattern':
          if (value && rule.value) {
            const regex = new RegExp(rule.value);
            isValid = regex.test(value);
            message = isValid ? '' : rule.message;
          }
          break;

        case 'custom':
          if (rule.validator) {
            isValid = rule.validator(value);
            message = isValid ? '' : rule.message;
          }
          break;
      }

      if (!isValid) {
        return { isValid: false, message };
      }
    }

    return { isValid: true, message: '' };
  }, [fields]);

  // Handle field change
  const handleFieldChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Mark field as dirty
    setTouchedFields(prev => new Set(prev).add(name));
    
    // Validate field
    const validation = validateField(name, value);
    setValidationState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        isValid: validation.isValid,
        message: validation.message,
        isDirty: true
      }
    }));
  }, [validateField]);

  // Handle field blur
  const handleFieldBlur = useCallback((name: string) => {
    setTouchedFields(prev => new Set(prev).add(name));
  }, []);

  // Check if form is valid
  const isFormValid = useCallback(() => {
    return fields.every(field => {
      const fieldValidation = validationState[field.name];
      return fieldValidation && fieldValidation.isValid;
    });
  }, [fields, validationState]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newValidationState: ValidationState = { ...validationState };
    let hasErrors = false;

    fields.forEach(field => {
      const value = formData[field.name];
      const validation = validateField(field.name, value);
      
      newValidationState[field.name] = {
        isValid: validation.isValid,
        message: validation.message,
        isDirty: true
      };

      if (!validation.isValid) {
        hasErrors = true;
      }
    });

    setValidationState(newValidationState);

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validationState, fields, validateField, onSubmit]);

  // Render field based on type
  const renderField = (field: any) => {
    const fieldValidation = validationState[field.name];
    const isTouched = touchedFields.has(field.name);
    const showError = isTouched && fieldValidation && !fieldValidation.isValid;

    const baseProps = {
      id: field.name,
      name: field.name,
      value: formData[field.name] || '',
      onChange: (e: any) => handleFieldChange(field.name, e.target.value),
      onBlur: () => handleFieldBlur(field.name),
      className: `form-field ${showError ? 'error' : ''} ${fieldValidation?.isDirty ? 'dirty' : ''}`,
      placeholder: field.placeholder
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...baseProps}
            rows={4}
          />
        );

      case 'select':
        return (
          <select {...baseProps}>
            <option value="">Select {field.label}</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={formData[field.name] || false}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
            className={`form-checkbox ${showError ? 'error' : ''}`}
          />
        );

      case 'radio':
        return (
          <div className="radio-group">
            {field.options?.map((option: any) => (
              <label key={option.value} className="radio-option">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  className={showError ? 'error' : ''}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            {...baseProps}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="advanced-form-validation">
      <div className="form-header">
        <h3 className="form-title">
          <IconSystem name="edit" size="sm" />
          Advanced Form with Validation
        </h3>
      </div>

      <div className="form-fields">
        {fields.map((field) => {
          const fieldValidation = validationState[field.name];
          const isTouched = touchedFields.has(field.name);
          const showError = isTouched && fieldValidation && !fieldValidation.isValid;

          return (
            <div key={field.name} className="field-group">
              <label htmlFor={field.name} className="field-label">
                {field.label}
                {field.validation?.some(rule => rule.type === 'required') && (
                  <span className="required-indicator">*</span>
                )}
              </label>

              {renderField(field)}

              {/* Validation Message */}
              {showError && (
                <div className="validation-message error">
                  <IconSystem name="error" size="sm" />
                  {fieldValidation.message}
                </div>
              )}

              {/* Success Message */}
              {isTouched && fieldValidation && fieldValidation.isValid && fieldValidation.isDirty && (
                <div className="validation-message success">
                  <IconSystem name="check" size="sm" />
                  Valid
                </div>
              )}

              {/* Field Status Indicator */}
              <div className="field-status">
                {isTouched && (
                  <span className={`status-indicator ${fieldValidation?.isValid ? 'valid' : 'invalid'}`}>
                    {fieldValidation?.isValid ? '✓' : '✗'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? (
            <>
              <IconSystem name="loading" size="sm" />
              Processing...
            </>
          ) : (
            <>
              <IconSystem name="save" size="sm" />
              {submitButtonText}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setFormData(initialData);
            setValidationState({});
            setTouchedFields(new Set());
          }}
          className="reset-btn"
        >
          <IconSystem name="refresh" size="sm" />
          Reset Form
        </button>
      </div>

      {/* Form Summary */}
      <div className="form-summary">
        <div className="summary-item">
          <span className="summary-label">Total Fields:</span>
          <span className="summary-value">{fields.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Valid Fields:</span>
          <span className="summary-value">
            {Object.values(validationState).filter(v => v.isValid).length}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Form Status:</span>
          <span className={`summary-value ${isFormValid() ? 'valid' : 'invalid'}`}>
            {isFormValid() ? 'Ready to Submit' : 'Has Errors'}
          </span>
        </div>
      </div>
    </form>
  );
};

export default AdvancedFormValidation;
