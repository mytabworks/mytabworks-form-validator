import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Form} from '../../FormContainer'
import Input from '../Input.js';

describe('Input consistent test agrregation', () => {
    test('basic usage', () => {
        const { getByTestId } = render(<Form><Input id="test-1" name="input-1" data-testid="test"/></Form>)

        const input = getByTestId("test")

        const form_control = input.closest('.form-control')

        const label = form_control.querySelector('label')
        
        expect(input).toBeInTheDocument()

        expect(input).toHaveValue("")

        expect(input).toHaveAttribute('id') 

        expect(input.id).toBe('test-1')
        
        expect(input).toHaveAttribute('type')

        expect(input.type).toBe('text')

        expect(input).toHaveAttribute('name')

        expect(input.name).toBe('input-1')

        expect(label).not.toBeInTheDocument()
        
        expect(form_control.className).toBe('form-control')

        let error = form_control.querySelector('.error-msg')

        expect(error).not.toBeInTheDocument()

        let required = form_control.querySelector('.required')

        expect(required).not.toBeInTheDocument()
    })

    test('if other props are rendered', () => {
        const { getByTestId } = render(<Form><Input type="email" rules="required|email" id="test-2" name="input-2" value="sample" className="formation" label="Xample" alias="alias-2" disabled={true} data-testid="test"/></Form>)

        const input = getByTestId("test")

        const form_control = input.closest('.form-control')

        const label = form_control.querySelector('label')
        
        expect(input).toBeInTheDocument()

        expect(input).toHaveValue("sample")

        expect(input).toHaveAttribute('type')

        expect(input.type).toBe('email')

        expect(input).toHaveAttribute('id')

        expect(input.id).toBe('test-2')

        expect(input).toHaveAttribute('name')

        expect(input.name).toBe('input-2')

        expect(input).toHaveAttribute('disabled') 

        expect(input).toHaveAttribute('alias')

        expect(input.getAttribute('alias')).toBe('alias-2')

        expect(label).toBeInTheDocument()

        expect(label.textContent).toBe('Xample*')

        expect(form_control.className).toBe('form-control formation')
        
        // input.focus()

        // input.blur()

        // const error_msg = form_control.querySelector('.error-msg')

        // expect(error_msg).toBeInTheDocument()

        // expect(error_msg.textContent).toBe('The Xample field is requireds')

        let error = form_control.querySelector('.error-msg')

        expect(error).not.toBeInTheDocument()

        let required = form_control.querySelector('.required')

        expect(required).toBeInTheDocument()
    })

    test('type checkbox rendering', () => {
        const { getAllByTestId, getByText } = render(<Form>
                <Input type="checkbox" className="formation" rules="required" id="test-3" name="input-3[]" label="Checkbox" alias="checkok" data-testid="test">
                    {[
                        {label: "box-1", value: "1"},
                        {label: "box-2", value: "2"},
                        {label: "box-3", value: "3", disabled: true},
                        {label: "box-4", value: "4", defaultChecked:true}
                    ]}
                </Input>
            </Form>
        )

        const inputs = getAllByTestId("test")

        const label = getByText('Checkbox')

        const form_control = label.closest('.form-control')

        expect(inputs.length).toBe(4)

        Array.from(inputs).forEach((input, index) => {

            expect(input.value).toBe(`${index+1}`)

            expect(input).toHaveAttribute('type')

            expect(input.type).toBe('checkbox')  

            expect(input).toHaveAttribute('name')

            expect(input.name).toBe('input-3[]')

            index === 2 && expect(input).toHaveAttribute('disabled') 

            expect(input).toHaveAttribute('alias')

            expect(input.getAttribute('alias')).toBe('checkok')

            index === 3 && expect(input).toBeChecked()
        })
        
        expect(label).toBeInTheDocument()

        expect(label.textContent).toBe('Checkbox*')

        expect(form_control.className).toBe('form-control formation')

        expect(form_control).toHaveAttribute('id')

        expect(form_control.id).toBe('test-3')

        let error = form_control.querySelector('.error-msg')

        expect(error).not.toBeInTheDocument()

        let required = form_control.querySelector('.required')

        expect(required).toBeInTheDocument()
        
    })

    
})
