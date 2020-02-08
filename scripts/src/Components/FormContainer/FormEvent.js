export class FormEvent {

    formdata = {}

    target;

    topError;

    formstatuses = {}

    constructor(form, statuses) {
      this.formstatuses = statuses
      this.target = form
      this.formdata = new FormData(form)
    }

    locateFailed(correction = 40) {
      this.topError || this.isReady()

      const root = document.documentElement

      if(!this.topError) return root.scrollTop;

      const error = this.target.querySelector(`[name="${this.topError}"], [alias="${this.topError}"]`) 

      return root.scrollTop = (root.scrollTop + error.getBoundingClientRect().top) - correction

    }

    isReady() {
      let ready = true

      for (let name in this.formstatuses) {
        if(this.formstatuses[name].isInvalid) {
          this.topError = name
          return false
        }
      }

      return ready
    }

    forEach(callback) {
      const formdata = this.formdata.entries()
      let current = formdata.next()
      while (!current.done) {
        const [name, value] = current.value
        callback && callback.call({ name, value }, value, name)
        current = formdata.next()
      }
    }

    json() {
      const result = {}

      this.forEach((value, name) => {
        const isArray = name.endsWith('[]')
        name = name.replace('[]', '')
        if(name in result) {
          if(Array.isArray(result[name])){
            result[name].push(value)
          } else {
            result[name] = [result[name], value]
          }
        } else {
          result[name] = isArray ? [value] : value
        }

      })

      return result
    }

    paramArray() {
      const result = []

      this.forEach(function() {
        result.push(this)
      })

      return result
    }

    param() {
      return this.paramArray().reduce((result, current) => result += `&${current.name}=${current.value}`, '').substr(1)
    }

    formData() {
      return this.formdata
    }
}
