import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.makerequest = this.makerequest.bind(this);
    this.state = {
      pe: 'Click Submit',
    }
  }

  makerequest(){

    var ticker = '';
    var params = {
      apikey: "5NO4O6TFSS7HI49J",
      symbol: ticker,
      function: "GLOBAL_QUOTE"
    };

    var axiosInstance0 = axios.create({
      baseURL: "https://api.iextrading.com/1.0/stock/" + ticker + "/earnings",
    });

    var axiosInstance1 = axios.create({
      baseURL: "https://www.alphavantage.co/query",
      params: params
    });
    
    var price = 0;
    var earnings = 0;

    // Start a spinner
    axiosInstance0.get().then (response => {
      console.log("First request finished");
      console.log(JSON.stringify(response.data));
      console.log(JSON.stringify(response.data["earnings"][0]["actualEPS"]));
      earnings = response.data["earnings"][0]["actualEPS"] + 
      response.data["earnings"][1]["actualEPS"] + response.data["earnings"][2]["actualEPS"] +
      response.data["earnings"][3]["actualEPS"];
      console.log("Earnings: " + earnings);

       // Start a spinner
      axiosInstance1.get().then (response => {
        console.log("2nd request finished");
        console.log(JSON.stringify(response.data["Global Quote"]["08. previous close"]));
        price = response.data["Global Quote"]["08. previous close"];
        console.log("Price: " + price);
        this.setState({
          pe: price/earnings
        });
      // stop the spinner
      })
      // stop the spinner
    })
  }

  tryStuff() {
    console.log("User Input value: " + document.getElementById("form1").value);
    
  }

  render() {
    var peVariable = this.state.pe
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
          
          <p>MSFT: {peVariable}</p>
          <form id="form1">
            Ticker:
            <input type="value"/>
            <button onClick={this.tryStuff} >S u b m i t</button>
          </form> 
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