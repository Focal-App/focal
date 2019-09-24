import React from "react";
import { Field, ErrorMessage } from 'formik';

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

export const CheckboxWithError = ({ label, name, type = "checkbox" }) => (
    <>
        <Field type={type} component={Checkbox} label={label} name={name} id={name} />
        <ErrorMessage className='field-error' name={name} component="div" />
    </>
)

export const FieldWithError = ({ label, name, type, component, placeholder }) => (
    <>
        <Label label={label} name={name} />
        <Field type={type} name={name} id={name} component={component} placeholder={placeholder} />
        <ErrorMessage className='field-error' name={name} component="div" />
    </>
)

export const DropdownFieldWithError = ({ label, name, children, placeholder }) => (
    <>
        <Label label={label} name={name} />
        <Field component="select" name={name} id={name} placeholder={placeholder}>
            {children}
        </Field>
        <ErrorMessage className='field-error' name={name} component="div" />
    </>
)