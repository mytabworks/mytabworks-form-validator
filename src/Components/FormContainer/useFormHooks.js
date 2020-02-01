import { useState } from 'react' 
import { Validator } from 'mytabworks-utils'
import { FormEvent } from './FormEvent'
import { FormContext } from './FormContext'
const validator = new Validator() 
 
export const useFormState = (willGet) => {
    return willGet(FormContext)
}

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
        value = Array.from(selectedOptions)
    }

    const updateState = {...state[name]}

    if(!updateState) return state

    const { label, validations } = updateState

    if(validations) {
        Object.assign(updateState, validator.validate(value, validations, label || target.name))
    }
    
    return {...state, [name]: updateState}
}

export const useForm = (fields = {}) => {

    const [form, setForm] = useState(fields)

    const formState = name => name ? form[name] : form
    
    const formUpdate = ({target}, alias) => { 
 
        setForm(state => formUpdater(state, target, alias))
    }

    // const willMount = useEffect

    const setFormWhenMount = ({name, label, validate}, willMount) => {
        
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

