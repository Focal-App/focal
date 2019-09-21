import React from "react";

export const Label = ({ label, name, className, children }) => (
    <label className={className} htmlFor={name} >
        {label}
        {children}
    </label>
)

export const Checkbox = ({
    field: { name, onChange, onBlur },
    form: { values },
    label,
    type,
    id
}) => {
    return (
      <div className="checkbox-container">
        <Label label={label} className="form-checkbox-answer" name={name}>
            <input
                name={name}
                id={name}
                type="checkbox"
                checked={values[name]}
                onChange={onChange}
                onBlur={onBlur}
            />
            <span className="checkmark" />
        </Label>
      </div>
    );
  };

