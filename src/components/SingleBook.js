import React, { Component } from 'react'
import GoBack from './GoBack';

class SingleBook extends Component {

    state = {
        book: [],
        images: []
    }

    componentWillMount = () => {
        const { bookId } = this.props.match.params;

        fetch('https://www.googleapis.com/books/v1/volumes?q=' + bookId)
        .then(result => result.json())
        .then(data => {
            let thisBook = data.items;
            this.setState({ book: thisBook[0].volumeInfo });
            this.setState({ images: thisBook[0].volumeInfo.imageLinks });

            console.log(this.state.book);
        });
    }

    render() {

        return (
            <div className="single-book-container">
                <GoBack />
                <div className="img-container">
                    <img src={this.state.images.thumbnail}/>
                </div>
                <div className="book-info">
                    <h1>{this.state.book.title}</h1>
                    <h2>By: {this.state.book.authors}</h2>
                    <h2>Published by: {this.state.book.publisher}</h2>
                    <p>{this.state.book.description}</p>
                </div>
            </div>
        )
    }
}

export default SingleBook;
