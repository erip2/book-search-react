import React, { Component } from 'react'
import GoBack from './GoBack';

import ls from 'local-storage';

class SingleBook extends Component {

    state = {
        book: [],
        images: [],
        cart: false
    }

    componentWillMount = () => {
        const { bookId } = this.props.match.params;

        fetch('https://www.googleapis.com/books/v1/volumes?q=' + bookId)
        .then(result => result.json())
        .then(data => {
            let thisBook = data.items;
            this.setState({ book: thisBook[0].volumeInfo });
            this.setState({ images: thisBook[0].volumeInfo.imageLinks });
        });

        this.setState({ cart: ls.get('cart') });
    }

    addToCart = () => {
        this.setState({ cart: true });
        ls.set('cart', this.state.cart);
    }

    disabled = () => {
        if(this.state.cart == true) {
            return 'disabled'
        }
    }

    render() {

        return (
            <React.Fragment>
                <GoBack />
                <div className="single-book-container">
                    <div className="img-container">
                        <img src={this.state.images.thumbnail}/>
                    </div>
                    <div className="book-info">
                        <h1>{this.state.book.title}</h1>
                        <h2>By: {this.state.book.authors}</h2>
                        <h2>Published by: {this.state.book.publisher}</h2>
                        <p>{this.state.book.description}</p>
                        <button onClick={this.addToCart} className={this.disabled}>Add to Cart</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SingleBook;
