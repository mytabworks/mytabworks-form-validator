import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { DoneTypingEvent } from 'mytabworks-utils'  
import './Select.css'

const SelectPropTypes = {
    id:         PropTypes.string.isRequired,
    name:       PropTypes.string.isRequired,
    validate:   PropTypes.string,
    placeholder:PropTypes.string,
    className:  PropTypes.string,
    children:   PropTypes.array,
    onChange:   PropTypes.func,
    isMultiple: PropTypes.bool,
    isAutoClear: PropTypes.bool,
    noDisplayText: PropTypes.string
}

const SelectDefaultProps = {
    className: '',
    isMultiple: false,
    isAutoClear: false,
    noDisplayText: 'no option'
}

const callBackChange = ({selectedOptions, onChange, selector, isMultiple}) => {
    const target = {
        name: selector.name,
        form: selector.form,
        selectedOptions
    }
    if(isMultiple) {
        target.value = selectedOptions
    } else {
        target.value = selectedOptions[0].value
    }
    onChange({ target, name: target.name, value: target.value, original: selector })
}

const renderOptions = ({ options, id, search, selectedOptions}) => {
    
    const pattern = new RegExp(`^${search}`,'i')

    return options.filter(row => Array.isArray(row.value) || pattern.test(row.label)).map(({label, value}, key) => {
        
        if(!Array.isArray(value)) {
            return <li className={"option"+(selectedOptions.some(row => row.value === value) ? ' selected' : '')} key={`${id}-${key}`} value={value}>{label}</li>
        }
        if(pattern.test(label)) {
            return (
                <li className="optgroup" key={`${id}-${key}`}>
                    <b>{label}</b>
                    <ul>
                    { 
                        value.map(({label, value}, keyg) => <li className={"option"+(selectedOptions.some(row => row.value === value) ? ' selected' : '')} key={`${id}-${key}-${keyg}`} value={value}>{label}</li>) 
                    }
                    </ul>
                </li>
            )
        }

        return value.filter(row => pattern.test(row.label)).map(({label, value}, keyg) => <li className={"option"+(selectedOptions.some(row => row.value === value) ? ' selected' : '')} key={`${id}-${key}-${keyg}`} value={value}>{label}</li>)
    })
}

const renderHiddenOptions = ({options, id}) => {
    
    return options.map(({label, value}, key) => Array.isArray(value)
        ? value.map(({label, value}, keyg) => <option key={`${id}-${key}-${keyg}`} value={value}>{label}</option>)
        : <option key={`${id}-${key}`} value={value}>{label}</option>
    )
}

const Select = ({id, name, validate, className, children, placeholder, onChange, isMultiple, isAutoClear, noDisplayText, ...props}) => {

    const [state, changeState] = useState({isFocus: false, isDropUp: false, search: '', selectedOptions: props.defaultValue || props.value || []})

    let selector, searchbar, isInteracting = false
    
    id = id || name

    props = { ...props, name, id}

    if(!('multiple' in props) && isMultiple)
        props.multiple = true
    // focus the searchbar after the update
    useEffect(() => {
        state.isFocus && searchbar.focus()
    },[state, searchbar])

    const showDropdown = () => {
        const {top, height} = selector.parentElement.getBoundingClientRect() 
        const isBelowTheScreen = (top + height + 250) > window.innerHeight
        const updateState = { isFocus: true, isDropUp: isBelowTheScreen }
        changeState(prevstate => ({...prevstate,...updateState}))
    }

    const changeStateAndCallback = (selectedOptions) => {
        changeState(prevstate => ({...prevstate, selectedOptions}))
        onChange && callBackChange({selector, onChange, selectedOptions, isMultiple})
    }
    
    const searchBarKeyBoardInteraction = e => {
        
        const isBackSpaceAndSearchValueIsEmpty = e.keyCode === 8 && state.search === '' && e.target.value === '' && state.selectedOptions.length
        if(isBackSpaceAndSearchValueIsEmpty) {
            const selectedOptions = state.selectedOptions.slice(0, -1)
            changeStateAndCallback(selectedOptions)
        }
        if(e.type === 'keypress' && e.which === 13) {
            e.preventDefault()
            const pattern = new RegExp(`^${e.target.value.replace(/\W+/g, '')}`,'i')
            const lioptions = children 
            .filter( row => (pattern.test(row.label) && !state.selectedOptions.some(srow => srow.label === row.label))|| Array.isArray(row.value))
            .map(row => Array.isArray(row.value) 
                ? pattern.test(row.label) 
                    ? row.value.filter(frow => !state.selectedOptions.some(srow => srow.label === frow.label)) 
                    : row.value.filter(frow => pattern.test(frow.label) && !state.selectedOptions.some(srow => srow.label === frow.label))  
                : !state.selectedOptions.some(srow => srow.label === row.label) ? row : []
            )
            .flat()
            if(lioptions.length) {
                const selectedOptions = [...state.selectedOptions, lioptions[0]]
                changeStateAndCallback(selectedOptions)
            }
        }
    }

    const interuptBlur = () => {
        isInteracting = true 
        return false
    }
    
    const handleFacade = { 
        onMouseDown: interuptBlur,
        // showing dropdown when click the facade
        onMouseUp: e => { 
            if(isMultiple && e.target.matches('.tag-close')) {
                const label = e.target.parentElement.textContent
                const selectedOptions = state.selectedOptions.filter(option => option.label !== label)
                changeStateAndCallback(selectedOptions)
            } else {
                showDropdown()
            }
        }
    }

    const handleSelect = {
        // showing dropdown when click label for select
        onFocus: showDropdown,
        // noop
        onChange: () => {}
    }

    const handleSearchbar = DoneTypingEvent(({target, type}) => {console.log('fire', type)
        const value = target.value = target.value.replace(/\W+/g, '')
        changeState(prevstate => ({...prevstate, search: value}))
    }, 500, isMultiple ? searchBarKeyBoardInteraction : undefined )
    
    // hiding dropdown
    // rewrite onBlur in done typing
    handleSearchbar.onBlur = e => {
        if(!isInteracting)
            changeState(prevstate => ({...prevstate, isFocus: false}))
        isInteracting = false
    }

    const handlerDropdown = {
        // one step faster than onBlur so it can stop the change when clicking 
        onMouseDown: interuptBlur,
        // core selecting a option
        onMouseUp: e => {
            const { target } = e
            searchbar.focus()
            if(!target.matches('.option:not(.selected)')) return;
            const value = target.getAttribute('value')
            const label = target.textContent  
            const selected = {label, value}
            const selectedOptions = isMultiple ? [...state.selectedOptions, selected] : [selected] 
            const updateForState = { selectedOptions }
            
            if(isAutoClear) { 
                updateForState.search = searchbar.value = ''
            }

            changeState(prevstate => ({...prevstate, ...updateForState }))
            onChange && callBackChange({selector, onChange, selectedOptions, isMultiple})
        }
    }
    
    const filterOptions = useMemo(() => renderOptions({search: state.search, selectedOptions: state.selectedOptions, id, options: children}), [state.search, state.selectedOptions, id, children])
    
    const hiddenOptions = useMemo(() => renderHiddenOptions({id, options: children}), [id, children])

    const searchinput = <input ref={node => searchbar = node} className={ isMultiple ? "selector-cursor" : "selector-search"} {...handleSearchbar} placeholder={ isMultiple ? placeholder : 'search options...'} />

    return (
        <div className={`selector ${state.isFocus ? 'active' : ''} ${className}`.trim()}> 
            <select ref={node => selector = node} {...props} value={isMultiple ? state.selectedOptions.map(row => row.value) : state.selectedOptions.length ? state.selectedOptions[0].value : ''} {...handleSelect}>
                <option value=""></option>
                {hiddenOptions}
            </select>
            <div className="selector-facade" {...handleFacade}>
            { isMultiple 
                ? <div className="selected-tags">{state.selectedOptions.map((row, key) => <span key={`${id}-${key}-selected`} className="selected-tag">{row.label}<span className="tag-close"></span></span>)} {searchinput}</div> 
                : state.selectedOptions.length ? state.selectedOptions[0].label : <span className="placeholder">{placeholder}</span>
            }
            </div> 
            <div className={`selector-dropdown ${state.isDropUp ? 'selector-dropup' : ''}`.trim()} {...handlerDropdown}>
                {isMultiple || searchinput}
                <ul>
                {state.isFocus && (filterOptions.length && filterOptions.some(opt => !Array.isArray(opt) || opt.length > 0) ? filterOptions : <li className="has-no-display">{noDisplayText}</li>)}
                </ul>
            </div>
        </div>
      )
}

Select.propTypes = SelectPropTypes
Select.defaultProps = SelectDefaultProps

export default Select

