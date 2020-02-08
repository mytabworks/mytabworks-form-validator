import React, { useContext, useEffect, useMemo } from 'react'
import { FormContext } from '../FormContainer/FormContext' 
import FormFieldPropTypes from './FormFieldPropTypes'

const SelectPropTypes = { 
    ...FormFieldPropTypes
}

const SelectDefaultProps = {
    className: ''
}

const renderOptions = ({id, options}) => options.map(({ label, value }, key) => {
    return Array.isArray(value)
        ? <optgroup key={`${id}-${key}`} label={label}>{value.map(({ label, value }, keyg) => <option key={`${id}-${key}-${keyg}`} value={value}>{label}</option>)}</optgroup>
        : <option key={`${id}-${key}`} value={value}>{label}</option>
})

const Select = ({id, label, name, validate, className, children, alias, onChange, ...props}) => {

    const facadeName = alias || name
    
    const finalId = id || facadeName
    
    const {formState, formUpdate, formRegister} = useContext(FormContext)

    const state = formState(facadeName)

    const handleEvents = validate 
                            ? { 
                                onChange: ({target}) => {
                                    onChange && onChange({target, value: target.value, name: target.name}) 
                                    formUpdate({target}, alias) 
                                } 
                            } 
                            : {onChange}

    formRegister({name: facadeName, label, validate}, useEffect)

    props = { ...props, name, alias}

    const selectOptions = useMemo(() => renderOptions({id, options: children}), [children, id])

    return (
        <div className={`form-control ${className}`.trim()}>
            {label && <label htmlFor={finalId}>{label}{validate && validate.includes('required') && <span className="required">*</span>}</label>}
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

