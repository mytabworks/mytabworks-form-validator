import { useState } from 'react' 
import { Validator } from 'mytabworks-utils'
import { FormEvent } from './FormEvent'
const validator = new Validator()
// const getter = useContext
 
// export const getFormState = () => {
//     return getter(FormContext)
// }

const formUpdater = (state, target, alias) => {
    let  { name, value, form, files, selectedOptions } = target

    if(['checkbox', 'radio'].includes(target.type)) {
        value = Array.from(form.querySelectorAll(`[name="${name}"]`)).filter(element => element.checked)
    }  

    if(alias) {
        name = alias
    }

    if(files) {
        value = files
    }

    if(selectedOptions) {
        value = selectedOptions
    }

    const updateState = {...state[name]}

    if(!updateState) return state

    const { label, validations } = updateState

    if(validations) {
        Object.assign(updateState, validator.validate(value, validations, label || target.name))
    }
    
    return {...state, [name]: updateState}
}

export const useFormState = (fields = {}) => {

    const [form, setForm] = useState(fields)

    const formState = name => form[name]
    
    const formUpdate = ({target}, alias) => { 
 
        setForm(state => formUpdater(state, target, alias))
    }

    // const willMount = useEffect

    const setFormWhenMount = ({name, label, validate, useEffect}, willMount) => {
        
        validate && willMount(() => {

            setForm( state => (
                {   
                    ...state,
                    [name]:  {
                        label,
                        validations: validate,
                        isInvalid: false,
                        message: null
                    }
                })
            )
    
            return () => {
                setForm(state => {
                    delete state[name]
                    return {...state}
                })
            }
        }, [])
    }

    const handlerSubmit = onSubmit => {

        return event => {
            event.preventDefault()

            const states = {...form}

            const statuses = Object.keys(form).reduce((result, name) => {
                const target = document.querySelector(`[alias="${name}"], [name="${name}"]`)

                return target ? formUpdater(result, target, name) : result
            }, states)

            setForm(statuses)

            const formevent = new FormEvent(event.target, statuses)
            return onSubmit(formevent)
        }

    }

    return [formState, formUpdate, setFormWhenMount, handlerSubmit]
}

