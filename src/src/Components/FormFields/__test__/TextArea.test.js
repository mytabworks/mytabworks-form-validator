import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Form} from '../../FormContainer'
import TextArea from '../TextArea.js';

describe('TextArea consistent test agrregation', () => {

    test('basic usage', () => {
        const { getByTestId } = render(<Form><TextArea id="test-1" validate="required" name="textarea-1" data-testid="test"/></Form>)

        const textarea = getByTestId("test")

        const form_control = textarea.closest('.form-control')

        const label = form_control.querySelector('label')
        
        expect(textarea).toBeInTheDocument()

        expect(textarea).toHaveValue("")

        expect(textarea).toHaveAttribute('id') 

        expect(textarea.id).toBe('test-1')

        expect(textarea).toHaveAttribute('name')

        expect(textarea.name).toBe('textarea-1')

        expect(label).not.toBeInTheDocument()
        
        expect(form_control.className).toBe('form-control')

        let error = form_control.querySelector('.error-msg')

        expect(error).not.toBeInTheDocument()

        let required = form_control.querySelector('.required')

        expect(required).not.toBeInTheDocument()
    })

    test('if other props are rendered', () => {
        const { getByTestId } = render(
            <Form>
                <TextArea validate="required" id="test-2" name="input-2" value="sample" className="formation" label="TXT" alias="alias-2" disabled={true} data-testid="test">
                    sample
                </TextArea>
            </Form>
        )

        const input = getByTestId("test")

        const form_control = input.closest('.form-control')

        const label = form_control.querySelector('label')
        
        expect(input).toBeInTheDocument()

        expect(input).toHaveValue("sample")

        expect(input).toHaveAttribute('id')

        expect(input.id).toBe('test-2')

        expect(input).toHaveAttribute('name')

        expect(input.name).toBe('input-2')

        expect(input).toHaveAttribute('disabled') 

        expect(input).toHaveAttribute('alias')

        expect(input.getAttribute('alias')).toBe('alias-2')

        expect(label).toBeInTheDocument()

        expect(label.textContent).toBe('TXT*')

        expect(form_control.className).toBe('form-control formation') 

        let error = form_control.querySelector('.error-msg')

        expect(error).not.toBeInTheDocument()

        let required = form_control.querySelector('.required')

        expect(required).toBeInTheDocument()
    })

})