import React from 'react';

class App extends React.Component{
  constructor(){
    super();
    this.getData = this.getData.bind(this);
  }

  getData(){
    console.log("Clicked!");
    fetch("http://localhost:3000/test")
    .then(data => data.json())
    .then(JSONdata => console.log(JSONdata, '***'))
    .catch(error => console.log(error))
  }

  render(){
    return(
      <>
        <button onClick={this.getData}>Click Me!</button>
      </>
    )
  }
}
export default App;