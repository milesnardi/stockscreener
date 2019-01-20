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

    var axiosInstance = axios.create({
      baseURL: "https://api.iextrading.com/1.0/stock/aapl/earnings",
    });
    // Start a spinner
    axiosInstance.get().then (response => {
      console.log(JSON.stringify(response.data));
      console.log(JSON.stringify(response.data["earnings"][0]["actualEPS"]));
      this.setState({
        close: JSON.stringify(response.data["earnings"][0]["actualEPS"] + 
        response.data["earnings"][1]["actualEPS"] + response.data["earnings"][2]["actualEPS"] +
        response.data["earnings"][3]["actualEPS"])
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
          <input type = "text"
                 id = "myText"
                 value = "text here" />

          <button onClick={this.makerequest} >S u b m i t</button>
          <p>MSFT: {closeVariable}</p>
        </header>
      </div>
    );
  }
}

export default App;


// Git instructions
// git add * --- Adds files youwant to commit
// git status --- check to see if all the files you want to commit is green
// git commit -m "YOUR MESSAGE HERE, what did you change" --- add message to your commit
// git push origin <branch> --- push to a particular branch. Master is the default

// git checkout -b <unique_branch_name> -- creates a new branch
// git branch --- see what branch you're in

// git pull origin <branch> --- pull latest from github


// git config user.name "<username>"
// git config user.email "<git_email>"
//<ESC>   :wq --- to quit terminal text editor(VIM) 