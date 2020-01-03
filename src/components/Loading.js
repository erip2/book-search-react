import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as bookLoading from '../styles/loading.json';

import BookSearch from './BookSearch';
import Error from './Error'
import { Switch, Route } from 'react-router-dom';
import SingleBook from './SingleBook';
import { CSSTransition, TransitionGroup }  from 'react-transition-group';

class Loading extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: undefined,
            done: undefined
        }
    }

    componentDidMount() {
        setTimeout(() => {
           fetch("https://jsonplaceholder.typicode.com/posts")
           .then(response => response.json())
           .then(json => {
              this.setState({ loading: true });
              setTimeout(() => {
                 this.setState({ done: true });
              }, 3000);
           });
        }, 1200);
     }

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: bookLoading.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }

        return(
            <React.Fragment>
            {!this.state.done ? (
                <div className="bg-orange-300 h-full flex items-center justify-center">
                    <FadeIn>
                        <div class="flex justify-content-center align-items-center h-100">
                            <Lottie options={defaultOptions} height={400} width={400} />                      
                        </div>
                    </FadeIn>
                </div>
            ) : (
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
            )}
        </React.Fragment>
        )
    }
}

 export default Loading;