import React from "react";

const FormField = ({ field, register, errors }) => {
  return (
    <div className="form-field">
      <label>{field.label}</label>
      {field.type === "dropdown" ? (
        <select {...register(field.name, { required: field.required })}>
          <option value="">Select {field.label}</option>
          {field.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          {...register(field.name, { required: field.required })}
        />
      )}
      {errors[field.name] && <p className="error">This field is required</p>}
    </div>
  );
};

export default FormField;

