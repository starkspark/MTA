import React from 'react';
import { EventEmitter } from 'events';

class Form extends React.Component{
  constructor(){
    super()
    this.state ={
      phoneNumber :'',
      selectedLines : {},
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

    return(
      <>
        <label className="container">4 line
          <input id='4' type="checkbox" onClick = {this.addLine}/>
          <span className="checkmark"></span>
        </label> 
        <input id="phone-input" type="text" onChange={this.getInput}></input>
        <button onClick={this.addSubscriber}>Hi sierra</button>
      </>
    )
  }
}

export default Form