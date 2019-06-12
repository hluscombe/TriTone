import React from "react";
import Animations from './components/Animations.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import Sounds from './components/Sounds';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/tritone">
        <Switch>
          <Route exact path='/' component={Animations}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
