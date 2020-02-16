import React from 'react';
import PropTypes from 'prop-types'

const FormControlPropTypes = {
    finalId: PropTypes.string.isRequired,
    label: PropTypes.string,
    rules: PropTypes.string,
    className: PropTypes.string,
    state: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired, 
}

const FormControlDefaultProps = { 
    className: ''
}

const FormControl = ({finalId, label, rules, className, children, state, ...props}) => (
    <div className={`form-group ${className} ${state && state.isInvalid ? "form-error" : ""}`.trim()} {...props}>
        {label && <label htmlFor={finalId}>{label}{rules && /required(?!_)/.test(rules) && <span className="required">*</span>}</label>}
        {children}
        {state && state.isInvalid && <span className="error-msg">{state.message}</span>}
    </div>
)

FormControl.propTypes = FormControlPropTypes
FormControl.defaultProps = FormControlDefaultProps

export default FormControl

