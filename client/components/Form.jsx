import React from 'react';
import { EventEmitter } from 'events';
import SubmitButton from '../styled components/Submit$.jsx';
import InputStyle from '../styled components/Input$.jsx';
import Lines from '../styled components/Lines$.jsx';
import LabelStyle from '../styled components/Label$.jsx';

class Form extends React.Component{
  constructor(){
    super()
    this.state ={
      phoneNumber :'',
      selectedLines : {},
      allLines: ['1', '2', '3', '4', '5', '6', '7', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'j', 'l', 'm', 'n', 'q', 'r', 's', 'w', 'z']
    }
    this.addSubscriber = this.addSubscriber.bind(this);
    this.getInput = this.getInput.bind(this);
    this.addLine = this.addLine.bind(this);
}

getInput(){
  const gotPhone = document.querySelector('#phone-input').value
  // console.log({ gotPhone })
  this.setState({
    phoneNumber: gotPhone
  })
}
addSubscriber(){
  console.log("Clicked!");
  console.log('number in addsubscriber', this.state.phoneNumber)
  fetch("http://localhost:3000/test", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      phone: this.state.phoneNumber,
      lines: Object.keys(this.state.selectedLines)
    })
  })
  .then(()=>{
    console.log('post we got through')
  })
  .catch(error => console.log(error))
}

addLine(event){
  const selectedTrain = event.target.id
  if(event.target.checked){
    const copyLines = JSON.parse(JSON.stringify(this.state.selectedLines));
    if(!copyLines[selectedTrain]){
      copyLines[selectedTrain] = true;
      this.setState({
      selectedLines: copyLines
      })
    }
  } else {
      const copyLines = JSON.parse(JSON.stringify(this.state.selectedLines));
      delete copyLines[selectedTrain]
      this.setState({
        selectedLines: copyLines
      })
  }
}

  render(){
    console.log('Tracking the state of phone number',this.state.phoneNumber)

    let lines = this.state.allLines.map(element => {
      return (  
        <LabelStyle>{element}
          <input id={element} name={element} type="checkbox" onClick = {this.addLine}/>
          <span className="checkmark"></span>
        </LabelStyle>
      )
    })

    return(
      <>
      <Lines>
        {lines}
      </Lines>
        <InputStyle id="phone-input" type="text" onChange={this.getInput} placeholder="Enter phone number here"></InputStyle>
        <SubmitButton onClick={this.addSubscriber}>Submit</SubmitButton>
      </>
    )
  }
}

export default Form