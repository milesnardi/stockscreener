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
    var ticker = document.getElementById("userInput").value;

    var params0 = {
      apikey: "5NO4O6TFSS7HI49J",
      symbol: ticker,
      function: "GLOBAL_QUOTE"
    };

    var axiosInstance0 = axios.create({
      baseURL: "https://api.iextrading.com/1.0/stock/" + ticker + "/earnings",
    });

    var axiosInstance1 = axios.create({
      baseURL: "https://www.alphavantage.co/query",
      params: params0
    });

    var price = 0;
    var earnings = 0;

    axiosInstance0.get().then (response => {
      earnings = response.data["earnings"][0]["actualEPS"] + 
      response.data["earnings"][1]["actualEPS"] + response.data["earnings"][2]["actualEPS"] +
      response.data["earnings"][3]["actualEPS"];
      
      axiosInstance1.get().then (response => {
        price = response.data["Global Quote"]["08. previous close"];
        this.setState({
          pe: price/earnings
        });
        document.getElementById("TickerAndPE").innerHTML = ticker + ": " + this.state.pe;
      })
    })
  }

  testBarchart() {
    var params = {
      'apikey': 'be7dda93ccb9ac20646c41d6a13bf6ee',
      'symbols': 'AAPL',
      'fields': 'fiftyTwoWkHigh,fiftyTwoWkHighDate,fiftyTwoWkLow,fiftyTwoWkLowDate',
    };

    var notOnDemand = axios.create({
      baseURL: "https://marketdata.websol.barchart.com/getQuote.json",
      params: params
    });

    notOnDemand.get().then(response => {
      console.log(response.data.results);
    });

    /* get a quote for AAPL and GOOG */
    /*onDemand.getQuote({symbols: 'AAPL,GOOG'}, function (err, data) {
        var quotes = data.results;
        for (x in quotes) {
            console.log("getQuote: " + quotes[x].symbol + " [" + quotes[x].name + "] = " + JSON.stringify(quotes[x]));
        }
    });*/
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
        
          <button onClick={this.testBarchart} >TEST</button>

          Ticker:
          <input type="text" id="userInput"/>
          <button onClick={this.makerequest} >S u b m i t</button>
          <p id="TickerAndPE"> </p>
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