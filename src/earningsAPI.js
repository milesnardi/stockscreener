import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.makerequest = this.makerequest.bind(this);
    this.state = {
      pe0: '',
      pe1: '',
      marketcap: '',
    }
  }

  makerequest(){
    var ticker = document.getElementById("userInput").value;

    var params0 = {
      apikey: "5NO4O6TFSS7HI49J",
      symbol: ticker,
      function: "GLOBAL_QUOTE"
    };

    var params1 = {
      'apikey': 'be7dda93ccb9ac20646c41d6a13bf6ee',
      'symbols': ticker,
      'fields': 'fiftyTwoWkHigh,fiftyTwoWkHighDate,fiftyTwoWkLow,fiftyTwoWkLowDate',
    };

    var axiosInstance0 = axios.create({
      baseURL: "https://api.iextrading.com/1.0/stock/" + ticker + "/earnings",
    });

    var axiosInstance1 = axios.create({
      baseURL: "https://www.alphavantage.co/query",
      params: params0
    });


    var axiosInstance2 = axios.create({
      baseURL: "https://marketdata.websol.barchart.com/getQuote.json",
      params: params1
    });

    var axiosInstance10 = axios.create({
      baseURL: "https://api.iextrading.com/1.0/stock/" + ticker + "/stats",
    });



    var price0 = 0;
    var price1 = 0;
    var earnings = 0;
    var promises = [];
    var marketcap = 0;



    promises.push(axiosInstance0.get().then (response => {
      earnings = response.data["earnings"][0]["actualEPS"] + 
      response.data["earnings"][1]["actualEPS"] + response.data["earnings"][2]["actualEPS"] +
      response.data["earnings"][3]["actualEPS"];
    }))

    promises.push(axiosInstance1.get().then (response => {
      price0 = response.data["Global Quote"]["08. previous close"];
    }))

    promises.push(axiosInstance2.get().then(response => {
      price1 = response.data.results[0].close;
    }))
    promises.push(axiosInstance10.get().then (response => {
      marketcap = response.data["marketcap"]; 
    }))


    Promise.all(promises).then (response => {
      this.setState({
        pe0: price0/earnings,
        pe1: price1/earnings,
        marketcap: marketcap,
      });
      document.getElementById("output0").innerHTML = ticker + ": " + this.state.pe0;
      document.getElementById("output1").innerHTML = ticker + ": " + this.state.pe1;
      document.getElementById("output10").innerHTML = ticker + ": " + this.state.marketcap;
    });
  }


  render() {
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

          Ticker:
          <input type="text" id="userInput"/>
          <button onClick={this.makerequest} >S u b m i t</button>
          <p id="output0"> </p>
          <p id="output1"> </p>
          <p id="output10"> </p>

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