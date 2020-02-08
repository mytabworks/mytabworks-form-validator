import React, { useMemo } from 'react'
import FormControl from './FormControl'
import { FieldPropTypes, useField } from './FormFieldUtils'

const SelectPropTypes = { 
    ...FieldPropTypes
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

    const { state, handleEvents, finalId } = useField({label, name, alias, id, validate, onChange}, true)

    props = { ...props, name, alias}

    const selectOptions = useMemo(() => renderOptions({id, options: children}), [children, id])
    
    const formControlProps = { finalId, label, validate, className, children, state }

    return (
        <FormControl {...formControlProps}>
            <select id={finalId} {...props} {...handleEvents}>
                {selectOptions}
            </select>
        </FormControl>
    )
}

Select.propTypes = SelectPropTypes
Select.defaultProps = SelectDefaultProps

export default Select

