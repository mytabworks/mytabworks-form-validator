import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Form} from '../../FormContainer'
import Select from '../Select.js';
const selectChild = [
    {label: 'beginer', value: '1'},
    {label: 'mid-level', value: [
      {label: 'intermidiate', value: '2'},
      {label: 'exprerience', value: '3'}
    ]},
    {label: 'mid-term', value: [
      {label: 'interminate', value: '7'},
      {label: 'exprerment', value: '8'}
    ]},
    {label: 'mid-expert', value: '4'},
    {label: 'expert', value: '5'},
  ]

const onSubmit = e => {

}

describe('Select consistent test agrregation', () => {
    test('basic usage with disabled', () => {
        const { getByTestId } = render(<Form onSubmit={onSubmit} data-testid="form"><Select rules="required" id="test-1" name="select-1" disabled={true} alias="sel" data-testid="test">{selectChild}</Select></Form>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument()

        expect(select).toHaveValue("1")

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-1')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-1')

        expect(select).not.toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()

        const form_control = select.closest('.form-control')

        const label = form_control.querySelector('label')

        expect(label).not.toBeInTheDocument()

        expect(select).toHaveAttribute('alias')

        expect(select.getAttribute('alias')).toBe('sel')

        expect(form_control.className).toBe('form-control')

        let error = form_control.querySelector('.error-msg')

        expect(error).not.toBeInTheDocument()

        let required = form_control.querySelector('.required')

        expect(required).not.toBeInTheDocument()

    })

    test('basic usage in multiple', () => {
        const { getByTestId } = render(<Form><Select id="test-2" rules="required" name="select-2" label="Multiple" multiple={true} data-testid="test">{selectChild}</Select></Form>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument()

        expect(select).toHaveValue([])

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-2')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-2')

        expect(select).toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()

        const form_control = select.closest('.form-control')

        const label = form_control.querySelector('label')

        expect(label).toBeInTheDocument()

        expect(label.textContent).toBe('Multiple*')

        expect(form_control.className).toBe('form-control')

        let required = form_control.querySelector('.required')

        expect(required).toBeInTheDocument()
    })

    test('select with defaultValue not multiple', () => {
        const { getByTestId } = render(<Form><Select id="test-3" name="select-3" defaultValue="1" label="Multiple2" className="multiple" data-testid="test">{selectChild}</Select></Form>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument()

        expect(select).toHaveValue("1")

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-3')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-3')

        expect(select).not.toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()

        const form_control = select.closest('.form-control')

        const label = form_control.querySelector('label')

        expect(label).toBeInTheDocument()

        expect(label.textContent).toBe('Multiple2')

        expect(form_control.className).toBe('form-control multiple')

    })

    test('select with value multiple', () => {
        
        const { getByTestId, getByText } = render(<Form><Select id="test-4" name="select-4" value={['1','5']} multiple={true} label="Multiple" className="multiple" data-testid="test">{selectChild}</Select></Form>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument() 

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-4')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-4')

        expect(select).toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()

        const form_control = select.closest('.form-control')

        const label = form_control.querySelector('label')

        expect(label).toBeInTheDocument()

        expect(label.textContent).toBe('Multiple')

        expect(form_control.className).toBe('form-control multiple')

        expect(select.selectedOptions.length).toBe(2)

        const valueIsRender = Array.from(select.selectedOptions).every(option => ['1','5'].includes(option.value))

        expect(valueIsRender).toBeTruthy()
    })

        test('select with value and disabled multiple', () => {
        
        const { getByTestId, getByText } = render(<Form><Select id="test-5" name="select-5" value={['1','5']} multiple={true} disabled={true} label="Multiple" className="multiple" alias="mul" data-testid="test">{selectChild}</Select></Form>)

        const select = getByTestId("test")
        
        expect(select).toBeInTheDocument() 

        expect(select).toHaveAttribute('id')

        expect(select.id).toBe('test-5')

        expect(select).toHaveAttribute('name')

        expect(select.name).toBe('select-5')

        expect(select).toHaveAttribute('multiple')

        const beginer = Array.from(select.options).some(row => row.label === 'beginer' && row.value === '1')

        expect(beginer).toBeTruthy()

        const expert = Array.from(select.options).some(row => row.label === 'expert' && row.value === '5')

        expect(expert).toBeTruthy()

        const form_control = select.closest('.form-control')

        const label = form_control.querySelector('label')

        expect(label).toBeInTheDocument()

        expect(label.textContent).toBe('Multiple')

        expect(form_control.className).toBe('form-control multiple')

        expect(select).toHaveAttribute('alias')

        expect(select.getAttribute('alias')).toBe('mul')

        expect(select.selectedOptions.length).toBe(2)

        const valueIsRender = Array.from(select.selectedOptions).every(option => ['1','5'].includes(option.value))

        expect(valueIsRender).toBeTruthy()
    })

})