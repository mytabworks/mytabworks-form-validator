import React from 'react';  
import {Input, Select, TextArea, Form, useFormState} from './Components' 
import { Validator } from 'mytabworks-utils'
import { same, required_if, max_size } from 'mytabworks-utils/extend/rules'

Validator.rulesExtend({same, required_if, max_size}) 

const selectChild = [
  {label: 'option', value: ''},
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

const onSubmit = (e) => console.log(e.locateFailed(), e, e.param(), e.isReady())

const Design = () => {
  const {formRegister, formUpdate, formState} = useFormState(React.useContext)

  const {ui, ux} = formState() 
  
  const registration = [
    {name:'ui', label:'UI', rules: 'required|max:10'},
    {name:'ux', label:'UX', rules: 'required|min:10'}
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
  const [state, setState] = React.useState({value: ''}) 

  const handler = (e) => {
    const value = e.target.value; setState({value: value})
  }
  return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <Form ref={form} id="example-basic" method="post" name="example" onSubmit={onSubmit} style={{width:"500px"}}>
            { state.value === '1' && <Design/> }
            <Input rules="required|same:sample@Sample" type="text" name="name" placeholder="enter your name..." label="Name" onChange={handler}/>
            <Input  type="text" name="name" value={state.value} placeholder="enter your name..." label="Name2" alias="name-2" onChange={handler} />
            <Input type="text" name="sample" placeholder="enter your email..." label="E-mail" />
            <Input rules="required" type="radio" name="gender" className="inline-box" label="Gender" onChange={handler}>
              {[
                {label: 'male', value: '1'},
                {label: 'female', value: '2'},
              ]}
            </Input>
            <Input rules="min:2|max:3" type="checkbox" name="interested[]" className="inline-box" label="Interested">
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
            <Select label="Level" rules="required|max:3|min:2" name="level" placeholder="choose one" multiple={true}  onChange={handler}>
              {selectChild}
            </Select>
            <Select label="Level-2" rules="required" alias="sasa"  name="level" placeholder="choose one"  onChange={handler}>
              {selectChild}
            </Select>
            <TextArea rules="required" name="about" placeholder="describe your self..." label="About yourself" onChange={handler}></TextArea>
            <TextArea alias="required" name="about" placeholder="describe your self..." label="About yourself2" onChange={handler}></TextArea>
            {state.value !== '1' && <Input multiple rules="mimes:jpg|max_size:1000|max:2|min:2" type="file" name="resume" label="Your Resume`"/>}
            <Input type="range" rules="required|max:40" name="range" placeholder="enter your email..." label="Range" />
            <Input type="date" rules="required" name="date" placeholder="enter your email..." label="Data" />
            <Input type="number" rules="required|max:40" name="number" placeholder="enter your email..." label="Number" />
            <Input type="color" rules="required" name="color" placeholder="enter your email..." label="Color" />
            <Input type="time" rules="required|max:40" name="time" placeholder="enter your email..." label="Time" />
            
            <button type="submit" style={{padding:"10px 15px", backgroundColor:'ivory'}}>Button is your choice</button>
          </Form>
    </div>
  );
}

export default App;
