import React, { useContext, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from '../FormContainer/FormContext' 

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

const renderOptions = ({id, options}) => options.map(({ label, value }, key) => {
    return Array.isArray(value)
        ? <optgroup key={`${id}-${key}`} label={label}>{value.map(({ label, value }, keyg) => <option key={`${id}-${key}-${keyg}`} value={value}>{label}</option>)}</optgroup>
        : <option key={`${id}-${key}`} value={value}>{label}</option>
})

const Select = ({id, label, name, validate, className, children, alias, ...props}) => {

    const facadeName = alias || name
    
    const finalId = id || facadeName
    
    const {formState, formUpdate, formRegister} = useContext(FormContext)

    const state = formState(facadeName)

    const handleEvents = validate 
                            ? { 
                                onChange: ({target}) => {
                                    props.onChange && props.onChange({target, value: target.value, name: target.name}) 
                                    formUpdate({target}, alias) 
                                } 
                            } 
                            : {}

    formRegister({name: facadeName, label, validate}, useEffect)

    props = { ...props, name, alias}

    const selectOptions = useMemo(() => renderOptions({id, options: children}), [children, id])

    return (
        <div className={`form-control ${className}`.trim()}>
            {label && <label htmlFor={finalId}>{label}</label>}
            <select id={finalId} {...props} {...handleEvents}>
                {selectOptions}
            </select>
            {state && state.isInvalid && <span className="error-msg">{state.message}</span>}
        </div>
    )
}

Select.propTypes = SelectPropTypes
Select.defaultProps = SelectDefaultProps

export default Select

