import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types'
import { FormContext } from '../FormContainer/FormContext'
import { DoneTypingEvent } from 'mytabworks-utils' 
import FormFieldPropTypes from './FormFieldPropTypes'

const TextAreaPropTypes = {
    ...FormFieldPropTypes,
    children: PropTypes.string, 
}

const TextAreaDefaultProps = { 
    className: ''
}

const TextArea = ({id, label, name, validate, className, children, alias, onChange, ...props}) => {
    
    const facadeName = alias || name
    
    const finalId = id || facadeName
    
    const {formState, formUpdate, formRegister} = useContext(FormContext)

    const state = formState(facadeName)

    const handleEvents = validate 
        ? DoneTypingEvent(({target}) => {
            onChange && onChange({target, value: target.value, name: target.name}) 
            formUpdate({target}, alias)
        }, 500) : {onChange}

    formRegister({name: facadeName, label, validate}, useEffect)

    props = { ...props, name, alias}

    return (
        <div className={`form-control ${className}`.trim()}>
            {label && <label htmlFor={finalId}>{label}{validate && validate.includes('required') && <span className="required">*</span>}</label>}
            <textarea id={finalId} {...props} {...handleEvents} >{children}</textarea>
            {state && state.isInvalid && <span className="error-msg">{state.message}</span>}
        </div>
    )
}

TextArea.propTypes = TextAreaPropTypes
TextArea.defaultProps = TextAreaDefaultProps

export default TextArea

