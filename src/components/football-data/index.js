
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      games: []
    };
  }
   async onClick(year) {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    await this.setState({
      selectedYear: year
    })
    this.showGames();
  }

  async showGames(){
    const response = await fetch(`https://jsonmock.hackerrank.com/api/football_competitions?year=${this.state.selectedYear}`);
    const games = await response.json();

    await this.setState({games: games.data})
                
  }

  render() {
    var years= [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
              onClick={()=> this.onClick(year)}
              key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>
        {this.state.selectedYear ? <section className="content">
          <section>
            <div className="total-matches" data-testid="total-matches">Total matches: {this.state.games.length}</div>
            
            <ul className="mr-20 matches styled" data-testid="match-list">
              {(this.state.games.length > 0) ? 
                this.state.games.map((game) => {
                  return (
                    <li className="slide-up-fade-in">Match {game.name} won by {game.winner}</li>
                  )
                })
               :  <div data-testid="no-result" className="slide-up-fade-in no-result">No Matches Found</div>}              
            </ul>
          </section>

          <div data-testid="no-result" className="slide-up-fade-in no-result"></div>
        </section> : ""}
        
      </div>
    );
  }
}