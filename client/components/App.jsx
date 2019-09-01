import React from 'react';
import Form from './Form.jsx';
import AppStyle from '../styled components/App$.jsx';

class App extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div>
      <h1>Juan on Juan</h1>
      <AppStyle>
        <Form />
      </AppStyle>
      </div>
    )
  }
}
export default App;