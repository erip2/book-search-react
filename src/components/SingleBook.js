import React, { Component } from 'react'
import GoBack from './GoBack';
import ls from 'local-storage';
import Select from 'react-select';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class SingleBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: [],
            images: [],
            found: true,
            bookshelves: [],
            selectedOption: null
        }
    }

    shelvesId = [];

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
        });
    }

    getUserShelves = () => {
        let token = ls.get('Token');
        this.options = [];

        fetch('https://www.googleapis.com/books/v1/mylibrary/bookshelves', {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        .then(result => result.json())
        .then(data => {
            this.setState({ bookshelves: data.items }, () => {
                this.state.bookshelves.map((el) => {
                    this.options.push({
                        'value': el.title,
                        'label': el.title,
                        'id': el.id
                    })
                });
            });

            this.getThisBookShelves();
        }); 
    }

    getThisBookShelves = () => {
        let token = ls.get('Token');
        const userId = ls.get('UserId');
        let shelvesInfo = [];
        let counter = 0;

        this.state.bookshelves.map((el) => {
            this.shelvesId.push(el.id);
        })

        this.shelvesId.forEach((el, i) => {
            fetch(`https://www.googleapis.com/books/v1/users/101895911035204620682/bookshelves/${el}/volumes`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            })
            .then(response => response.json())
            .then(data => {
                shelvesInfo.push(data);
                counter++;

                if(counter === this.shelvesId.length) {
                    this.checkShelves(shelvesInfo);
                }
            });
        })
    }

    checkShelves = (shelves) => {
        // console.log(shelves);

        // shelves.forEach((el, i) => {
        //     Object.assign(el, {['id']: this.shelvesId[i]});
        // });

        console.log(shelves);
        console.log(this.shelvesId);

        shelves.forEach((el) => {
            if(el.totalItems > 0) {
                el.items.forEach(e => {
                    if(e.id == this.props.match.params.bookId) {
                        //console.log(el);
                    }
                })
            }
        })
    }

    createNotification = (type) => {
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info('Info message');
              break;
            case 'success':
              NotificationManager.success('Success message', 'Great! The book is now on the shelf.');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    }

    addToShelf = (selectedOption) => {
        const { bookId } = this.props.match.params;
        let token = ls.get('Token');


        fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${selectedOption.id}/addVolume?volumeId=${bookId}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(this.createNotification('success'));
    }


    render() {

        const { selectedOption } = this.state;

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
                        <Select
                            isMulti
                            value={selectedOption}
                            options={this.options}
                            onChange={this.handleChange}
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => this.addToShelf(selectedOption)}>Add to selected shelf</button>
                    </div>
                    <NotificationContainer/>
                </div>
                }
            </React.Fragment>
        )
    }
}

export default SingleBook;
