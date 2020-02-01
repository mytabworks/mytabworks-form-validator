import React from 'react'
import PropTypes from 'prop-types'
import { FormContext } from './FormContext'
import { useFormState } from './useFormHooks'

const formPropTypes = {
    id: PropTypes.string,
    onSubmit: PropTypes.func,
    children: PropTypes.array
}
const formDefaultProps = {}

const Form = ({children, onSubmit, ...props}) => {
    
    const [formState, formUpdate, formSet, formHandler] = useFormState({})

    const context = {formState, formUpdate, formSet}

    const handlerSubmit = formHandler(onSubmit)

    return (
        <FormContext.Provider value={context}>
            <form {...props} onSubmit={handlerSubmit}>
                {children}    
            </form>
        </FormContext.Provider>
    )
}

Form.propTypes = formPropTypes
Form.defaultProps = formDefaultProps

export default Form
