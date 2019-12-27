import React from 'react';
import logo from './logo.svg';
import './styles/tailwind.css';
import BookSearch from './components/BookSearch';
import Error from './components/Error'
import { Switch, Route } from 'react-router-dom';
import SingleBook from './components/SingleBook';

import { CSSTransition, TransitionGroup }  from 'react-transition-group';

function App() {
  return (
    <div className="App" >
      <Route render={({location}) => (
         <TransitionGroup>
         <CSSTransition
            key={location.key}
            timeout={450}
            classNames="fade"
         >
           <Switch location={location}>
             <Route path='/' component={BookSearch} exact/>
             <Route path='/singlebook/:bookId' component={SingleBook}/>
             <Route path='/searchQuery=:keyword' component={BookSearch} />
             <Route component={Error} />
           </Switch>
         </CSSTransition>
       </TransitionGroup>
      )} />
  </div>
  );
}

export default App;
