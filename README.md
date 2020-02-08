
# mytabworks-react-form-validator
This repository is a `light-weight`, `eazy`, `fast`, `powerlful` and ultimately... `beautiful`!, yes! you read it exactly as it is.</br>
It is `light-weight` because it was build from the ground up, no extra dependency added. it dont need reducer to call over time and don't need to pass on a event handler to children to children. The validations is extendable and yet reusable. It can be extend with your own validations added in the framework, so there is no need to redundantly create a validations. [`mytabworks-utils`]()</br>
It is `easy` to implement, because in just a few characters you are validating. it can be implemented with other component without a sweat, cheers!</br>
It is `fast` because it is made to be fast, it was build to make the state rest from every entry, and it don't need to call the whole reducer like redux does.
It is `powerful` bacause you can validate your form field components without affecting your properties. that is why it can be easily use in both small and scalable projects.</br>
It is `beautiful` because it don`t need a ugly and redandunt hard to maintain conditional validation code, and rendering of event handlers of childrens to children, because validation can be implemented beautifully in components to components without the old fashion terror implementation.</br>
The validation style is inspired by Laravel Validator kudos!.

# installation
```
npm i mytabworks-react-form-validator
```


# How to use


## import to your project
```js
import {Form, Input, TextArea, Select} from "mytabworks-react-form-validator"
```


## Basic Usage
```html
<Form>
    <Input type="text" id="name" name="name" placeholder="enter your name..." label="Name"/>
    <Select id="vote" name="vote" label="Level">
        {[
            {label: "I like It", value: "1"}, 
            {label: "I Hate It", value: "4"}
        ]}
    </Select>
    <TextArea id="comment" name="comment" placeholder="what is on your mind..."></TextArea>
</Form>
```


## Form Validate Usage
```html
<Form>
    <Input validate="required|alpha" type="text" id="name" name="name" placeholder="enter your name..." label="Name"/>
    <Input validate="required|email" type="text" id="email" name="email" placeholder="enter your email..." label="E-mail"/> 
    <Input validate="required" type="radio" id="gender" name="gender" className="inline-box" label="Gender" >
        {[
            {label: "Male", value: "1"},
            {label: "Female", value: "2"},
        ]}
    </Input>
    <Input validate="min:2|max:3" type="checkbox" id="interest" name="interested[]" className="inline-box" label="Interested">
        {[
            {label: "javascript", value: "1", defaultChecked: true},
            {label: "c#", value: "2", disabled: true},
            {label: "python", value: "3"},
            {label: "java", value: "4"}
        ]}
    </Input>
    <Select validate="required" id="level" name="level" label="Level">
        {[
            {label: "beginer", value: "1"},
            {label: "mid-level", value: [
                {label: "intermidiate", value: "2"},
                {label: "exprerience", value: "3"}
            ]},  
            {label: "expert", value: "4"}
        ]}
    </Select>
    <TextArea validate="required" id="about" name="about" placeholder="describe your self..." label="About yourself">
        I'am
    </TextArea>
    <Input validate="mimes:pdf,csv|max:2" type="file" id="resume" name="resume" multiple label="Your Resume`"/>

    <button type="submit" style={{padding:"10px 15px", backgroundColor:"ivory"}}>Submit me</button>
</Form>
```


# Customizable
It can customize a new Component for validation and can even implement on old Component without changing its props


## Before Customize
```js
import React from 'react'

export const Design = ({disabled = false}) => {

    return (
      <div>
          <div>
              <label>labelUI</label>
              <input name="ui" disabled={disabled}/>
          </div>
          <div>
              <label>labelUX</label>
              <input name="ux" disabled={disabled}/> 
          </div>
      </div>
    )
}
```


## After Customize
```js
import React from 'react'
import { useFormState } from "mytabworks-react-form-validator"

export const Design = ({disabled = false}) => {
    /*using form state*/
    const {formRegister, formUpdate, formState} = useFormState(React.useContext)
    
    /*getting the state of the fields*/
    const {ui, ux} = formState() 
    
    const registration = [
      {name:'ui', label:'labelUI', validate: 'required|max:10'},
      {name:'ux', label:'labelUX', validate: 'required|min:10'}
    ]
    
    /*registration of the fields to the state*/
    registration.forEach(registry => {
      formRegister(registry, React.useEffect)
    })
    
    /*formUpdate can use indirectly. when you need to get the value or other things*/
    /*it can also use directly in the eventListeners*/
    const indirectFormUpdateUse = e => {
        formUpdate(e)
        /*do other things here*/
    }

    return (
      <div>
          <div>
              <label>labelUI</label>
              <input name="ui" disabled={disabled} onChange={formUpdate}/> /*formUpdate direct use*/
              /*field state is use to render a message if invalid*/
              {ui && ui.isInvalid && <span className="your-style">{ui.message}</span>} 
          </div>
          <div>
              <label>labelUX {ux && ux.isInvalid && ux.message}</label>
              <input name="ux" disabled={disabled} onChange={indirectFormUpdateUse} /> /*formUpdate indirect use*/
          </div>
      </div>
    )
  }
```


## Implementation of Customize
```js
import React from 'react'
import { Form } from "mytabworks-react-form-validator"
import { Design } from "../Design"

export const Fields = () {
    return (
        <Form>
            <Design/>
            <button type="submit">Submit</button>
        </Form>
    )
}
```


## Form Submition
```js
const handleSubmit = (formevent) => {
    if(formevent.isReady()) { 
        /*all fields validation is passed*/
        
        fetch("/request", {
            method: "POST", 
            headers: {
                // "Content-Type": "application/json"
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formevent.param() /*for json use formevent.json(), for FormData use formevent.formData()*/
        })
        .then(/*next move*/)

    } else {
        /*some fields validation is failed*/
    }
}
```
```html
<Form id="form-fields" onSubmit={handleSubmit}>
    /*form fields*/ 
    <button type="submit">Submit</button>
</Form>
```


## Validations

### [What are the current or supported validations? Click Me](https://github.com/mytabworks/mytabworks-utils#validator-current-validations)

### [What are the extension validations? Click Me](https://github.com/mytabworks/mytabworks-utils#validator-extension-validations)

### [How to extend a validation? Click Me](https://github.com/mytabworks/mytabworks-utils#validator-extend-validations)
Validator does not require to repeatedly extend validation each component, you only have to extend validations each once, I suggest to import it to the ancestors component that handle all Forms

```js
import { Validator } from "mytabworks-utils";
import { 
    max_size, 
    min_size,
    required_if,
    alpha_space
} from "mytabworks-utils/extend/validations";
// required_if:name_of_target_field=target_expected_value 
// required_if can use @ as Alias to cover the real name_of_target_field and target_expected_value because they are mostly developer readable 
// required_if's target_expected_value can be regular expression or a normal string
// all those who have second parameter can use @ as Alias
// max_size:kilobytes
// min_size:kilobytes
// alpha_space
Validator.extend({ max_size, min_size, required_if, alpha_space })

```
```js
    import {Input} from "mytabworks-react-form-validator"

    export const ReasonFields = () =>{
        retrun (
            <div>
                <Input type="text" validate="alpha_space" name="rss" id="rss" label="Reasons">
                <Input type="file" validate="required_if:rss@Reasons=(.+)@has content|mimes:csv,xls|min_size:1000|max_size:5000" name="flexa" id="flexa" label="File XA">
                <Input type="text" validate="required_if:flexa=(.*\\.xls)@spreadshit" name="commit" id="commit" label="Commit">
            </div>
        )
    }
```

### [How to create a customize validation? Click Me](https://github.com/mytabworks/mytabworks-utils#validator-customize-validation)

```js
import { Validator } from "mytabworks-utils";
import { 
    same
} from "mytabworks-utils/extend/validations";
// same:name_of_target_field 
// all those who have second parameter can use @ as Alias
const strong_password = {
    regexp: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/g,
    exe(
        received, /*it is the value of the input you put*/
        first_param, /*validations:first_param*/ 
        second_param    /*validations:first_param=second_param*/
    ) {
        /*we don't need first_param and second_param for this validation*/
        /*must return true when it is INVALID*/
        return !this.regexp.test(received)
    },
    message: "The :attribute must have 1 small letter, 1 capital letter, 1 number, and 1 special character"
    /*note! the :attribute is replace with the label of the form field you validate*/
    /*note! if you have first_param in your validations you must put the same name as your validation like :strong_password in the message*/
    /*note! if you have second_param you must put :third_party in the message*/
}

Validator.extend({ same, strong_password })

```
```js
    import {Form, Input} from "mytabworks-react-form-validator"

    export const Register = () =>{
        retrun (
            <Form>
                <Input type="text" validate="required|alpha" name="hname" id="hname" label="Name"> 
                <Input type="password" validate="required|strong_password" name="p_word" id="p_word" label="Password"> 
                <Input type="password" validate="required|same:p_word@Password" name="confirm" id="confirm" label="Confirm">
                <button type="submit">Submit</button>
            </Form>
        )
    }
```


## `Form` Properties
All properties that is supported by Form Component.<br/>
The datatypes with "*" means it is required.

|`PROPERTY`   |`DATATYPES`    |`DEFAULT`    |`DESCRIPTION`|
|-------------|---------------|-------------|-------------|
|form defaults attribute| [mozila form documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) | and [w3schools form documentation](https://www.w3schools.com/tags/tag_form.asp) | All the default attributes of the form element tag can be use. visit the link for more info.
|onSubmit| function | | instance `FormEvent` will be passed unto the function argument with the capablities of getting the form data of the form.|


### `FormEvent` methods for Form onSubmit
All properties that is supported by instance FormEvent.<br/>

|`METHODS`      |`RETURNS`      |`DESCRIPTION`|
|---------------|---------------|-------------|
|.target        | form element  | It will get the form element.|
|.locateFailed()| integer       | It will locate the form field that fails the requirements. you can adjust the position by passing a int parameter .locateFailed(70/*default is 40*/) depends on your navbar height if it is floating|
|.isReady()     | boolean       | It will check if the form is ready and passed all the requirement validations.|
|.json()        | object        | It will return the form data in json.|
|.paramArray()  | array         | It will return the form data in array.|
|.param()       | string        | It will return the form data in url encode string.|
|.formData()    | FormData      | it will return instance of FormData.|
|.forEach(/*callback*/)| void      | it will loop each of the form data.|


## `Select` Properties
All properties that is supported by Select Component.<br/>
The datatypes with "*" means it is required.

|`PROPERTY`   |`DATATYPES`    |`DEFAULT`    |`DESCRIPTION`|
|-------------|---------------|-------------|-------------|
| id          | string *      |             | id of the HTML select|
| name        | string *      |             | name of the HTML select|
| label       | string        |             | the label of your form field|
| value       | array\|string |             | the set the default value|
| defaultValue| array\|string |             | the set the default value|
| placeholder | string        |             | placeholder of your Select|
| className   | string        |             | additional className for the Component container|
| disabled    | bolean        | false       | disabling the Select|
| multiple    | boolean       | false       | it allow users to select multiple option|
| onChange    | function      |             | it enables to subscribe change event|
| validate    | string        |             | it enables to validate the form field|
| alias       | string        |             | it enables to distinctively validate a form field with the same name, especially when user have priviledges to add new field| 
| ....etc     |               |             | you can passed on anything in select tag supported or data-something |


### `Select option properties`
All the properties of each option

|`PROPERTY`   |`DATATYPES`    |`DEFAULT`    |`DESCRIPTION`|
|-------------|---------------|-------------|-------------|
| label       | string *      |             | label of the option|
| value       | string|array *|             | the value of the option, if array of object of label and value will be group in optgroup| 
| ....etc     |               |             | you can passed on anything individually supported or data-something |


### Select option with group usage 
```html
<Form>
    <Select id="emotions" name="emotions" defaultValue={["1","2"]} multiple={true}>
        {[  
            {label: "Possitive", value: [
                {label: "Happy", value: "1"},
                {label: "Excited", value: "2"}
            ]}, 
            {label: "Negative", value: [
                {label: "Sad", value: "3"},
                {label: "Angry", value: "4"}, 
                {label: "Scared", value: "5"}
            ]},
            {label: "Hype", value: "6"},
            {label: "Pretty", value: "7"}
        ]}
    </Select>
</Form>
```


## `TextArea` Properties
All properties that is supported by TextArea Component.<br/>
The datatypes with "*" means it is required.

|`PROPERTY`   |`DATATYPES`    |`DEFAULT`    |`DESCRIPTION`|
|-------------|---------------|-------------|-------------|
| id          | string *      |             | id of the HTML textarea|
| name        | string *      |             | name of the HTML textarea|
| label       | string        |             | the label of your form field|
| placeholder | string        |             | placeholder of your textarea|
| className   | string        |             | additional className for the Component container|
| disabled    | boolean       | false       | disabling the textarea| 
| onChange    | function      |             | it enables to subscribe change event|
| validate    | string        |             | it enables to validate the form field|
| alias       | string        |             | it enables to distinctively validate a form field with the same name, especially when user have priviledges to add new field| 
| ....etc     |               |             | you can passed on anything in textarea tag supported or data-something |


## `Input` Properties
All properties that is supported by Input Component.<br/>
The datatypes with "*" means it is required.

|`PROPERTY`   |`DATATYPES`    |`DEFAULT`    |`DESCRIPTION`|
|-------------|---------------|-------------|-------------|
| id          | string *      |             | id of the HTML input|
| name        | string *      |             | name of the HTML input|
| type        | string        | text        | type of the HTML input. all the type in input field is supported, but radio and checkbox have small different mechanics because it is a selection|
| label       | string        |             | the label of your form field|
| placeholder | string        |             | placeholder of your input exluded [radio, checkbox]|
| className   | string        |             | additional className for the Component container|
| disabled    | boolean       | false       | disabling the input | 
| onChange    | function      |             | it enables to subscribe change event|
| validate    | string        |             | it enables to validate the form field|
| alias       | string        |             | it enables to distinctively validate a form field with the same name, especially when user have priviledges to add new field| 
| ....etc     |               |             | you can passed on anything in input tag supported or data-something |


### `Input type [checkbox, radio] children individual props`
All the properties of the Individual children of type [checkbox, radio]

|`PROPERTY`   |`DATATYPES`    |`DEFAULT`    |`DESCRIPTION`|
|-------------|---------------|-------------|-------------|
| label       | string *      |             | label in the Input Component is the label of the form field container and this is the label of your input type [checkbox, radio]|
| value       | string *      |             | the value of the input type [checkbox, radio]|
| disabled    | boolean       | false       | disabling the [checkbox, radio] individually | 
| defaultChecked| boolean     | false       | it will checked individually the type [checkbox, radio] |
| ....etc     |               |             | you can passed on anything individually supported or data-something |


### `Example for type [checkbox, radio]`
```html
/*All properties set in Input will be a property of all the individual except [className, label, validate] because this will all goes in form field container*/
<Form>
    <Input type="checkbox" id="interest" name="interested[]" className="inline-box" label="Interested">
        {[
            {label: "javascript", value: "1", defaultChecked: true},
            {label: "c#", value: "2", disabled: true},
            {label: "python", value: "3"},
            {label: "java", value: "4"}
        ]}
    </Input>
</Form>
```


## License
MIT Licensed. Copyright (c) Mytabworks 2020.

