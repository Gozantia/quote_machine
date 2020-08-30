
import React, { Component } from 'react'


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      quotes: [
        {
          quote: "Si la vida te da limones, aprende hacer huevos fritos.",
          author: "El Chavo"
        }],
      index: 0
    } 
   }

   async componentDidMount (){
    // llamado al API
    const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    let  respuesta =  await fetch(API)
    let data = await respuesta.json();
        this.setState({
          quotes: data.quotes
        },
          this.RandomQuote);
    };
  RandomQuote = () => {
    const { quotes } = this.state;
    if(quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      })
    }
  }
  
  render() {
  
    const { quotes, index } = this.state;
    const quote = quotes[index];
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`;
    
    return (
      <div className="wrapper d-flex align-items-center justify-content-center">
      <div className="col-6 box p-4 rounded bg-white" id="quote-box">
            <div>
              <h5 id="text" class="display-4">
                {quote.quote}
              </h5>
              <cite className="d-block text-right" id="author">
                - {quote.author}
              </cite>
            </div>

        <div className="d-flex justify-content-between">
          <a className="btn btn-sm btn-primary" 
            target="_blank" rel="noopener noreferrer" href={tweetURL} id="tweet-quote">
            <i className="fa fa-twitter"></i> Tuitear
          </a>
          
          <button className="btn btn-sm btn-warning" 
            onClick={this.RandomQuote} id="new-quote">
            <i className="fa fa-random"></i> Generar cita aleatoria
          </button>
        </div>
      </div>
    </div>
    )
  }
}
