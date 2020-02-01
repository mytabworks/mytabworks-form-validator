( function( global, factory ) {


	if ( typeof module === "object" && typeof module.exports === "object" ) {
    
		module.exports = factory( global )
      
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) { 
  
  class Validator {
    static supportAlias = ['required_if', 'same']
    static validationlist = {
      alpha: {
        regexp: /^[A-Za-z]+$/,
        message: 'The :attribute may only contain letters.',
        exe(received) {
          return received.length && !this.regexp.test(received)
        }
      },

      alpha_space: {
        regexp: /^[A-Za-z\s]+$/,
        message: 'The :attribute must contain alphabet with spaces',
        exe(received) {
          return received.length && !this.regexp.test(received)
        }
      },

      alpha_dash: {
        regexp: /^[a-zA-Z0-9-]+$/,
        message: 'The :attribute may only contain letters, numbers, and dashes.',
        exe(received) {
          return received.length && !this.regexp.test(received)
        }
      },

      alpha_num: {
        regexp: /^[A-Z-a-z\d]+$/,
        message: 'The :attribute may only contain letters and numbers.',
        exe(received) {
          return received.length && !this.regexp.test(received)
        }
      },

      email: {
        regexp: /^[\w.]{2,40}@[\w]{2,20}.[a-z]{2,3}$/,
        message: 'The :attribute must be a valid email.',
        exe(received) {
          return received.length && !this.regexp.test(received)
        }
      },

      url: {
        regexp: /^(?:https?:\/\/)?([a-z]{3}\.)?([a-z]{3,20}\.)?[\w]{3,20}\.[a-z]{2,3}(?:\/.*)?$/,
        message: 'The :attribute must be a valid url.',
        exe(received) {
          return received.length && !this.regexp.test(received)
        }
      },

      max: {
        message: {
          numeric: 'The :attribute may not be greater than :max.',
          file: 'The :attribute may not be greater than :max files.',
          string: 'The :attribute may not be greater than :max characters.',
          array: 'The :attribute may not be greater than :max items.',
        },
        exe(received, max) {
          max = parseInt(max)

          return !isNaN(parseInt(received)) ?
            received && parseInt(received) > max
          :
            received && received.length > max
        }
      },

      min: {
        message: {
          numeric: 'The :attribute must be atleast :min.',
          file: 'The :attribute must be atleast :min files.',
          string: 'The :attribute must be atleast :min characters.',
          array: 'The :attribute must be atleast :min items.',
        },
        exe(received, min) {
          min = parseInt(min)

          return !isNaN(parseInt(received)) ?
            received && parseInt(received) < min
          :
            received && received.length < min
        }
      },

      required: {
        message: 'The :attribute field is required.',
        exe(received) {
          return !received.length
        }
      },

      mimes: {
        message: 'The :attribute only allow :mimes.',
        exe(received, mimes) {
          return !Array.from(received).every(file => {
            const filename = file.name.split('.')
            return mimes.includes(filename[filename.length - 1])
          })

        }
      },

      max_size: {
        message: 'The :attribute may not be greater :max_size kilobytes.',
        exe(received, max_size) {
          max_size = parseInt(max_size)
          return received.length && Array.from(received).some(value => (value.size/1000) > max_size)
        }
      },

      min_size: {
        message: 'The :attribute must be atleast :min_size kilobytes.',
        exe(received, min_size) {
          min_size = parseInt(min_size)
          return received.length && Array.from(received).some(value => (value.size/1000) < min_size)
        }
      },

      required_if: {
        message: 'The :attribute field is required when :required_if is :third_party.',
        exe(received, name, value) {
          const [realname] = name.split('@')
          const [realvalue] = value.split('@')
          if(realname)
            name = realname
          if(realvalue)
            value = realvalue
          const target = document.querySelector(`[name="${name}"]`)
          if(!target) throw Error(`form (input, select, or textarea) that has a attribute [name = "${name}"] doesn't exist`)
          return !received.length && target.value === value.trim()
        }
      },

      same: {
        message: 'The :attribute and :same must match.',
        exe(received, name) {
          const [realname] = name.split('@')
          if(realname)
            name = realname
          const target = document.querySelector(`[name="${name}"]`)
          if(!target) throw Error(`form (input, select, or textarea) that has a attribute [name = "${name}"] doesn't exist`)
          return received.length && target.value !== received
        }
      },
    }

    extend(extension) {
      Object.assign(Validator.validationlist, extension)
    }

    validate(received, validations, attribute) {
      const validationlist = Validator.validationlist
      const array_validations = validations.split('|')
      let catch_name, catch_value, catch_third
      const isInvalid = array_validations.some((validation, index) => {
        const [name, value, third] = validation.split(/:|=/)
        catch_name = name
        catch_value = value
        catch_third = third
        return validationlist[name] && validationlist[name].exe(received, value, third)
      })

      if(isInvalid) {
        let validationlist_message = validationlist[catch_name].message
        let message;
        if(validationlist_message.toString() === '[object Object]') {
          if(typeof received === 'string') {
            validationlist_message = validationlist_message.string
          } else if(!isNaN(parseInt(received))) {
            validationlist_message = validationlist_message.numeric
          } else if(Array.isArray(received)) {
            validationlist_message = validationlist_message.array
          } else {
            validationlist_message = validationlist_message.file
          }
        }

        message = validationlist_message.replace(':attribute', attribute)

        if(catch_value) {
          if(Validator.supportAlias.includes(catch_name)) {
            const [ , alias] = catch_value.split('@')
            if(alias) catch_value = alias
          }
          message = message.replace(`:${catch_name}`, (catch_value || '').replace(',', ', '))
        }

        if(catch_third) {
          if(Validator.supportAlias.includes(catch_name)) {
            const [ , alias] = catch_third.split('@')
            if(alias) catch_third = alias
          }
          message = message.replace(':third_party', catch_third)
        }

        return {
          isInvalid,
          message
        }
      }

      return { isInvalid }
    }
  }
    
  if(global.document)
    return window.Validator = Validator
  
  return Validator
})
