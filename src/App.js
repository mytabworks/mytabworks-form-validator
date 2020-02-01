import React from 'react'; 

import './App.css';
import {Input, Select, TextArea} from './Components/Form'
import {Form} from './Components/FormContainer'
import { Validator } from 'mytabworks-utils'
import { same, required_if } from 'mytabworks-utils/extend'

Validator.extend({same, required_if})
console.log(Form.defaultProps)
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
const onSubmit = (e) => console.log(e.isReady(), e, e.param())
function App() {
  let form
  
  const [state, setState] = React.useState({value: ''})
  console.log(state)
  return (
    <div className="">
      <Form ref={form} id="example-basic" method="post" name="example" onSubmit={onSubmit}>
            <Input validate="required|same:sample@Sample" type="text" name="name" placeholder="enter your name..." label="Name"/>
            <Input validate="same:sample@Sample" type="text" name="name" placeholder="enter your name..." label="Name2" alias="name-2"/>
            <Input type="email" name="sample" value={state.value} placeholder="enter your email..." label="E-mail" />
            <Input validate="required" type="radio" name="gender" className="inline-box" label="Gender" >
              {[
                {label: 'male', value: '1'},
                {label: 'female', value: '2'},
              ]}
            </Input>
            <Input validate="required|min:2|max:3" type="checkbox" name="interested[]" className="inline-box" label="Interested">
              {state.value !== '1'?[
                {label: 'javascript', value: '1'},
                {label: 'c#', value: '2'},
                {label: 'php', value: '3'},
                {label: 'java', value: '4'},
              ]: [
                {label: 'php', value: '3'},
                {label: 'java', value: '4'},
              ]}
            </Input>
            <Select label="Level" validate="required|max:3|min:2" name="level" placeholder="choose one" isMultiple={true}  onChange={(e) => {const value = e.target.value; setState({value: value})}}>
              {selectChild}
            </Select>

                <div style={(state.value !== '4') ? {display: 'none'} : {}}>
                  <TextArea validate="required" name="about" placeholder="describe your self..." label="About yourself"></TextArea>

                </div>

              {state.value !== '1' && <Input multiple validate="required_if:gender@Level=1@beginer|mimes:jpg|max_size:1000|max:2" type="file" name="resume" label="Your Resume`"/>}

            <button type="submit" style={{padding:"10px 15px", backgroundColor:'ivory'}}>Button is your choice</button>

          </Form>
    </div>
  );
}

export default App;
