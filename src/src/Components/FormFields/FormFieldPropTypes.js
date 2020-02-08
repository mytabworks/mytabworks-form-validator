import PropTypes from 'prop-types'

const FormFieldPropTypes = {
    id:         PropTypes.string.isRequired,
    label:      PropTypes.string,
    name:       PropTypes.string.isRequired,
    validate:   PropTypes.string, 
    className:  PropTypes.string,
    children:   PropTypes.array,
    alias:      PropTypes.string,
    onChange:   PropTypes.func
}

export default FormFieldPropTypes
