import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from '../FormContainer'
import { DoneTypingEvent } from 'mytabworks-utils' 

const InputPropTypes = {
    id:         PropTypes.string.isRequired,
    label:      PropTypes.string,
    name:       PropTypes.string.isRequired,
    validate:   PropTypes.string,
    type:       PropTypes.string,
    className:  PropTypes.string,
    children:   PropTypes.array,
    alias:      PropTypes.string
}

const InputDefaultProps = {
    type: "text",
    className: ''
}

const convertToChild = ({finalId, options, props}) => {
    return !Array.isArray(options) 
    ? options 
    : options.map(({label, ...individualAttr}, key) => <label key={finalId+'-'+key}><input {...props} {...individualAttr} /><span>{label}</span></label>)
}

const Input = ({id, label, name, validate, type, className, children, alias, ...props}) => {
    console.log('renders')
    const facadeName = alias || name
    
    const finalId = id || facadeName
    
    const {formState, formUpdate, formSet} = useContext(FormContext)

    const state = formState(facadeName)

    const isClickable = ['checkbox', 'radio', 'file', 'range', 'date', 'date-time','color'].includes(type)

    const isChoices = ['checkbox', 'radio'].includes(type)

    const handleEvents = validate ? (
                            isClickable ? { 
                                onChange: ({target}) => {
                                    props.onChange && props.onChange({target, value: target.value, name: target.name}) 
                                    formUpdate({target}, alias) 
                                } 
                            } : DoneTypingEvent(e => formUpdate(e, alias), 500)
                        ) : {}

    formSet({name: facadeName, label, validate}, useEffect)

    props = { ...props, name, type, alias}

    return isChoices ? (
        <div className={`form-control ${className}`.trim()} {...handleEvents}>
          {label && <label htmlFor={finalId}>{label}</label>}
          {convertToChild({finalId, options: children, props})}
          {state && state.isInvalid && <span className="error-msg">{state.message}</span>}
        </div>
    ) : (
        <div className={`form-control ${className}`.trim()}>
            {label && <label htmlFor={finalId}>{label}</label>}
            <input id={finalId} name={name} {...props} {...handleEvents} />
            {state && state.isInvalid && <span className="error-msg">{state.message}</span>}
        </div>
    )
}

Input.propTypes = InputPropTypes
Input.defaultProps = InputDefaultProps

export default Input

