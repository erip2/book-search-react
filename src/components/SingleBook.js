import React, { Component } from 'react'
import GoBack from './GoBack';
import ReactDOMServer from 'react-dom/server';

import ls from 'local-storage';

class SingleBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: [],
            images: [],
            cart: {
                key: this.props.match.params,
                added: false
            },
            found: true
        }
    }

    componentWillMount = () => {
        const { bookId } = this.props.match.params;

        fetch('https://www.googleapis.com/books/v1/volumes?q=' + bookId)
        .then(result => result.json())
        .then(data => {
            let thisBook = data.items;

            if (data.totalItems > 0) {

                this.setState({ book: thisBook[0].volumeInfo });

                if (thisBook[0].volumeInfo.imageLinks) {
                    this.setState({ images: thisBook[0].volumeInfo.imageLinks });
                }

            } else {

                this.setState({ found: true })
            }
        });

        this.setState({ cart: ls.get('cart') });
    }

    addToCart = () => {
        this.setState(prevState => {
            let cart = Object.assign({}, prevState.cart);  // creating copy of state variable jasper
            cart.added = true;                     // update the name property, assign a new value                 
            return { cart };                                 // return new object jasper object
          })

        ls.set('cart', this.state.cart);
    }

    disabled = () => {
        if(this.state.cart.added == true) {
            return 'disabled'
        }
    }

    render() {

        return (
            <React.Fragment>
                <GoBack />
                {this.state.found == false ? 'No info found, sorry' : 

                <div className="single-book-container">
                    <div className="img-container">
                        <img src={this.state.images.thumbnail ? this.state.images.thumbnail : 'https://dummyimage.com/600x400/red/fff&text=No+image+available'}/>
                    </div>
                    <div className="book-info">
                        <h1>{this.state.book.title}</h1>
                        <h2>By: {this.state.book.authors}</h2>
                        <h2>Published by: {this.state.book.publisher}</h2>
                        <p>{this.state.book.description}</p>
                        <button onClick={this.addToCart} className={ReactDOMServer.renderToStaticMarkup(this.state.cart.added)}>Add to Cart</button>
                    </div>
                </div>
                }
            </React.Fragment>
        )
    }
}

export default SingleBook;
