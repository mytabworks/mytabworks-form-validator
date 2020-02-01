import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from '../FormContainer'
import { DoneTypingEvent } from 'mytabworks-utils' 

const TextAreaPropTypes = {
    id:         PropTypes.string.isRequired,
    label:      PropTypes.string,
    name:       PropTypes.string.isRequired,
    validate:   PropTypes.string, 
    className:  PropTypes.string,
    children:   PropTypes.array,
    alias:      PropTypes.string
}

const TextAreaDefaultProps = { 
    className: ''
}

const TextArea = ({id, label, name, validate, className, children, alias, ...props}) => {
    
    const facadeName = alias || name
    
    const finalId = id || facadeName
    
    const {formState, formUpdate, formSet} = useContext(FormContext)

    const state = formState(facadeName)

    const handleEvents = validate ? DoneTypingEvent(e => formUpdate(e, alias), 500) : {}

    formSet({name: facadeName, label, validate}, useEffect)

    props = { ...props, name, alias}

    return (
        <div className={`form-control ${className}`.trim()}>
            {label && <label htmlFor={finalId}>{label}</label>}
            <textarea id={finalId} {...props} {...handleEvents} >{children}</textarea>
            {state && state.isInvalid && <span className="error-msg">{state.message}</span>}
        </div>
    )
}

TextArea.propTypes = TextAreaPropTypes
TextArea.defaultProps = TextAreaDefaultProps

export default TextArea

