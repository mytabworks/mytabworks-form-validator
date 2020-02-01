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

    locateRequired() {
      this.topError || this.isReady()
      if(!this.topError) return;
      const error = this.target.querySelector(`[name="${this.topError}"]`)
      const root = document.documentElement
      return root.scrollTop = (root.scrollTop + error.getBoundingClientRect().top) - 70

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
