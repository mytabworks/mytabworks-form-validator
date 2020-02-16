import React from 'react'
import PropTypes from 'prop-types' 
import FormControl from './FormControl'
import { FieldPropTypes, useField } from './FormFieldUtils'

const InputPropTypes = {
    ...FieldPropTypes,
    type: PropTypes.string,
}

const InputDefaultProps = {
    type: "text",
    className: ''
}

const convertToChild = ({finalId, options, props}) => {
    return !Array.isArray(options)
        ? options
        : options.map(({ label, ...individualAttr }, key) => <label key={finalId + '-' + key}><input {...props} {...individualAttr} /><span></span>{label}</label>)
}

const Input = ({id, label, name, rules, type, className, children, alias, onChange, ...props}) => {
    
    const isClickable = ['checkbox', 'radio', 'file', 'range', 'date', 'date-time','color'].includes(type)

    const isChoices = ['checkbox', 'radio'].includes(type)

    const { state, handleEvents, finalId } = useField({label, name, alias, id, rules, onChange}, isClickable)

    props = { ...props, name, type, alias}
    
    const formControlProps = { finalId, label, rules, className, state }

    return isChoices ? (
        <FormControl {...formControlProps} {...handleEvents} id={finalId}>
            {convertToChild({finalId, options: children, props})}
        </FormControl>
    ) : (
        <FormControl {...formControlProps}>
            <input id={finalId} {...props} {...handleEvents} />
        </FormControl> 
    )
}

Input.propTypes = InputPropTypes
Input.defaultProps = InputDefaultProps

export default Input

