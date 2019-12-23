import React from 'react';
import logo from './logo.svg';
import './styles/tailwind.css';
import BookSearch from './components/BookSearch';
import Error from './components/Error'
import { Switch, Route } from 'react-router-dom';
import SingleBook from './components/SingleBook';

function App() {
  return (
    <div className="App" >
      <Switch>
        <Route path='/' component={BookSearch} exact/>
        <Route path='/singlebook/:bookId' component={SingleBook}/>
        <Route path='/searchQuery=:keyword' component={BookSearch} />
        <Route component={Error} />
      </Switch>
  </div>
  );
}

export default App;
