import React, { Component } from 'react'

class SingleBook extends Component {

    state = {
        book: [],
        images: []
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         book: []
    //     }
    // }

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
                <div className="img-container">
                    <img src={this.state.images.thumbnail}/>
                </div>
                <div className="book-info">
                    <h1>{this.state.book.title}</h1>
                    {/* <h2>By: {this.state.book.authors.map((auth) => auth)}</h2> */}
                    <h2>Published by: {this.state.book.publisher}</h2>
                    <p>{this.state.book.description}</p>
                </div>
            </div>
        )
    }
}

export default SingleBook;
