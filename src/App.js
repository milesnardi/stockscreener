import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.makerequest = this.makerequest.bind(this);
    this.state = {
      close: 'Click Submit!'
    }
  }

  makerequest(){
    var params = {
      apikey: "5NO4O6TFSS7HI49J",
      symbol: "MSFT",
      function: "GLOBAL_QUOTE"
    };

    var axiosInstance = axios.create({
      baseURL: "https://www.alphavantage.co/query",
      params: params
    });
    // Start a spinner
    axiosInstance.get().then (response => {
      console.log(JSON.stringify(response.data["Global Quote"]["08. previous close"]));
      this.setState({
        close: JSON.stringify(response.data["Global Quote"]["08. previous close"])
      })
      // stop the spinner
    })
  }

  render() {
    var closeVariable = this.state.close
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello World.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.makerequest} >S u b m i t</button>
          <p>MSFT: {closeVariable}</p>
        </header>
      </div>
    );
  }
}

export default App;


// git add * --- Adds files youwant to commit
// git status --- check to see if all the files you want to commit is green
// git commit -m "YOUR MESSAGE HERE, what did you change" --- add message to your commit
// git push origin <branch> --- push to a particular branch. Master is the default

// git checkout -b <unique_branch_name> -- creates a new branch
// git branch --- see what branch you're in


// git config user.name "<username>"
// git config user.email "<git_email>"
//<ESC>   :wq --- to quit terminal text editor(VIM) 