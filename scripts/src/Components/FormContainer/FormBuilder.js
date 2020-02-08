import React from 'react'
import PropTypes from 'prop-types'
import { FormContext } from './FormContext'
import { useForm } from './useFormHooks'

const formPropTypes = {
    id: PropTypes.string,
    onSubmit: PropTypes.func,
    children: PropTypes.any
}
const formDefaultProps = {}

const Form = ({children, onSubmit, ...props}) => {
    
    const [formState, formUpdate, formRegister, formHandler] = useForm({})

    const context = {formState, formUpdate, formRegister}

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
