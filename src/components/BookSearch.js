import React, { Component } from 'react'
import Input from './Input'
import SearchResults from './SearchResults';

class BookSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            results: []
        }
    }

    inputChange = (e) => {
        this.setState({ searchKeyword: e.target.value });

        fetch('https://www.googleapis.com/books/v1/volumes?q=' + e.target.value)
        .then(response => response.json())
        .then(data => this.setState({results: data}));
    }

    render() {
        return (
            <div>
                <Input value={this.state.searchKeyword} onChange={this.inputChange}/>
                <SearchResults results={this.state.results}/>
            </div>
        )
    }
}

export default BookSearch;
