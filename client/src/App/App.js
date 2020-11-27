import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Notes from './pages/Notes';

class App extends Component {
  render() {
    const App = () => (
        <div className="main">
            <header>
                <Link to="/"><span className="logo">✐</span>Notes</Link>
            </header>
            <nav>
                <Link to="/archive"><span className="icon">📁</span>Archive</Link>
                <Link to="/trash"><span className="icon">🗑️</span>Trash</Link>
            </nav>
            <Switch>
              <Route exact path='/'
                  render={(props) => (
                      <Notes {...props} type="notes" />
                  )}/>
              <Route exact path='/archive'
                  render={(props) => (
                      <Notes {...props} type="archive" />
                  )}/>
              <Route exact path='/trash'
                  render={(props) => (
                      <Notes {...props} type="trash" />
                  )}/>
            </Switch>
        </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
