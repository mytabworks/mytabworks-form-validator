import { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormContext } from '../FormContainer/FormContext'
import { DoneTypingEvent } from 'mytabworks-utils' 

export const FieldPropTypes = {
    id:         PropTypes.string.isRequired,
    label:      PropTypes.string,
    name:       PropTypes.string.isRequired,
    validate:   PropTypes.string, 
    className:  PropTypes.string,
    children:   PropTypes.array,
    alias:      PropTypes.string,
    onChange:   PropTypes.func
}

const eventHandler = ({target, formUpdate, onChange, alias}) => {
    onChange && onChange({target, value: target.value, name: target.name}) 
    formUpdate({target}, alias)
}

export const useField = ({label, name, alias, id, validate, onChange}, isClickable = false) => {

    const facadeName = alias || name
    
    const finalId = id || facadeName
    
    const {formState, formUpdate, formRegister} = useContext(FormContext)

    const state = formState(facadeName) 

    const handleEvents = validate ? (
                            isClickable ? { 
                                onChange: ({target}) => {
                                    eventHandler({target, formUpdate, onChange, alias})
                                } 
                            } : DoneTypingEvent(({target}) => { 
                                    eventHandler({target, formUpdate, onChange, alias})
                            }, 500)
                        ) : {onChange}

    formRegister({name: facadeName, label, validate}, useEffect)

    return { state, handleEvents, finalId }
}
