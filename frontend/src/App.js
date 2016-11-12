import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

/**
 * App react Component it defines our main window
 */
class App extends Component {
  /**
   * Render the App component
   * @return {Component} the App Component rendered
   */
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <p> This is a test !</p>

      </div>
    );
  }
}

export default App;
