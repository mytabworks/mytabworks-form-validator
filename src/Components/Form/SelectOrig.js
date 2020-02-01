import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from '../FormContainer' 
import Select2 from './Select'
const SelectPropTypes = {
    id:         PropTypes.string.isRequired,
    label:      PropTypes.string,
    name:       PropTypes.string.isRequired,
    validate:   PropTypes.string,
    className:  PropTypes.string,
    children:   PropTypes.array,
    alias:      PropTypes.string
}

const SelectDefaultProps = {
    className: ''
}

const Select = ({id, label, name, validate, className, children, alias, ...props}) => {

    const facadeName = alias || name
    
    const finalId = id || facadeName
    
    const {formState, formUpdate, formSet} = useContext(FormContext)

    const state = formState(facadeName)

    const handleEvents = validate 
                            ? { 
                                onChange: ({target}) => {
                                    props.onChange && props.onChange({target, value: target.value, name: target.name}) 
                                    formUpdate({target}, alias) 
                                } 
                            } 
                            : {}

    formSet({name: facadeName, label, validate}, useEffect)

    props = { ...props, name}

    return (
        <div className={`form-control ${className}`.trim()}>
            {label && <label htmlFor={finalId}>{label}</label>}
            {/* <select id={finalId} {...props} {...handleEvents}>
                {children.map(({label, value}, key) => {
                    return Array.isArray(value)
                        ? value.map(({label, value}, keyg) => <option key={`${id}-${key}-${keyg}`} value={value}>{label}</option>)
                        : <option key={`${id}-${key}`} value={value}>{label}</option>
                })}
            </select> */}
            <Select2 id={finalId} {...props} {...handleEvents}>{children}</Select2>
            {state && state.isInvalid && <span className="error-msg">{state.message}</span>}
        </div>
    )
}

Select.propTypes = SelectPropTypes
Select.defaultProps = SelectDefaultProps

export default Select

