import React from 'react';  
import {Input, Select, TextArea, Form, useFormState} from './Components' 
import { Validator } from 'mytabworks-utils'
import { same, required_if } from 'mytabworks-utils/extend'

Validator.extend({same, required_if}) 
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
const onSubmit = (e) => console.log(e.locateFailed(), e, e.param())

const Design = () => {
  const {formRegister, formUpdate, formState} = useFormState(React.useContext)

  const {ui, ux} = formState() 
  
  const registration = [
    {name:'ui', label:'UI', validate: 'required|max:10'},
    {name:'ux', label:'UX', validate: 'required|min:10'}
  ]

  registration.forEach(registry => {
    formRegister(registry, React.useEffect)
  })

  return (
    <div>
        <div>
            <label>UI</label>
            <input name="ui" onChange={formUpdate}/>
            {ui && ui.isInvalid && ui.message} 
        </div>
        <div>
            <label>ux</label>
            <input name="ux" onChange={formUpdate} />
            {ux && ux.isInvalid && ux.message} 
        </div>
    </div>
  )
}


function App() {
  let form
  const [state, setState] = React.useState({value: null}) 

  const handler = (e) => {
    const value = e.target.value; setState({value: value})
  }
  return (
    <div className="">
      <Form ref={form} id="example-basic" method="post" name="example" onSubmit={onSubmit}>
            { state.value === '1' && <Design/> }
            <Input validate="required|same:sample@Sample" type="text" name="name" placeholder="enter your name..." label="Name" onChange={handler}/>
            <Input  type="text" name="name" placeholder="enter your name..." label="Name2" alias="name-2" onChange={handler} />
            <Input type="text" name="sample" value={state.value} placeholder="enter your email..." label="E-mail" />
            <Input validate="required" type="radio" name="gender" className="inline-box" label="Gender" onChange={handler}>
              {[
                {label: 'male', value: '1'},
                {label: 'female', value: '2'},
              ]}
            </Input>
            <Input validate="min:2|max:3" type="checkbox" name="interested[]" className="inline-box" label="Interested">
              {state.value !== '1'?[
                {label: 'javascript', value: '1'},
                {label: 'c#', value: '2'},
                {label: 'php', value: '3'},
                {label: 'java', value: '4', defaultChecked: true},
              ]: [
                {label: 'php', value: '3'},
                {label: 'java', value: '4'},
              ]}
            </Input>
            <Select label="Level" validate="required|max:3|min:2" name="level" placeholder="choose one" multiple={true}  onChange={handler}>
              {selectChild}
            </Select>
            <Select label="Level-2" alias="sasa"  name="level" placeholder="choose one"  onChange={handler}>
              {selectChild}
            </Select>
            <div style={(state.value !== '4') ? {display: 'none'} : {}}>
              <TextArea validate="required" name="about" placeholder="describe your self..." label="About yourself" onChange={handler}></TextArea>
            </div>
            <TextArea alias="required" name="about" placeholder="describe your self..." label="About yourself" onChange={handler}></TextArea>
            {state.value !== '1' && <Input multiple validate="mimes:jpg|max_size:1000|max:2|min:2" type="file" name="resume" label="Your Resume`"/>}

            <button type="submit" style={{padding:"10px 15px", backgroundColor:'ivory'}}>Button is your choice</button>

          </Form>
    </div>
  );
}

export default App;
