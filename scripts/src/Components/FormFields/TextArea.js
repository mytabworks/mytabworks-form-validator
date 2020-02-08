import React from 'react';
import PropTypes from 'prop-types'
import FormControl from './FormControl'
import { FieldPropTypes, useField } from './FormFieldUtils'

const TextAreaPropTypes = {
    ...FieldPropTypes,
    children: PropTypes.string, 
}

const TextAreaDefaultProps = { 
    className: ''
}

const TextArea = ({id, label, name, rules, className, children, alias, onChange, ...props}) => {
    
    const { state, handleEvents, finalId } = useField({label, name, alias, id, rules, onChange})

    props = { ...props, name, alias}
    
    const formControlProps = { finalId, label, rules, className, children, state }

    return (
        <FormControl {...formControlProps}>
            <textarea id={finalId} {...props} {...handleEvents} ></textarea>
        </FormControl> 
    )
}

TextArea.propTypes = TextAreaPropTypes
TextArea.defaultProps = TextAreaDefaultProps

export default TextArea

