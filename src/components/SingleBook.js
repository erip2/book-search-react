import React, { Component } from 'react'
import GoBack from './GoBack';
import ls from 'local-storage';
import Select from 'react-select';

class SingleBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: [],
            images: [],
            found: true,
            bookshelves: []
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

                console.log(thisBook[0].volumeInfo);

            } else {

                this.setState({ found: true })
            }

            this.getUserShelves();
            console.log(this.state.bookshelves);
        });
    }

    getUserShelves = () => {
        let token = ls.get('Token');

        fetch('https://www.googleapis.com/books/v1/mylibrary/bookshelves', {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        .then(result => result.json())
        .then(data => {
            // data.items.map((el) => {
            //     console.log(el.title);
            // });
            // console.log(data);
            this.setState({ bookshelves: data.items })
        });
        this.options = [];


        this.state.bookshelves.map((el) => {
            this.options.push({
                'value': el.title,
                'label': el.title
            })
        });

        console.log(this.options);
    }


    render() {

        return (
            <React.Fragment>
                <GoBack />
                {this.state.found === false ? 'No info found, sorry' : 

                <div className="single-book-container">
                    <div className="img-container">
                        <img src={this.state.images.thumbnail ? this.state.images.thumbnail : 'https://dummyimage.com/600x400/red/fff&text=No+image+available'} alt={this.state.book.title}/>
                    </div>
                    <div className="book-info">
                        <h1>{this.state.book.title}</h1>
                        <h2>By: {this.state.book.authors}</h2>
                        <h2>Published by: {this.state.book.publisher}</h2>
                        <p>{this.state.book.description}</p>
                        {this.state.bookshelves}
                        <Select
                            options={this.options}
                        />
                    </div>
                </div>
                }
            </React.Fragment>
        )
    }
}

export default SingleBook;
