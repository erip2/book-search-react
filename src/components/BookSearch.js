import React, { Component } from 'react'
import Input from './Input'
import SearchResults from './SearchResults';
import history from '../config/history';

import ls from 'local-storage';

class BookSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            results: [],
        }
        
    }

    getResults = (value) => {
        fetch('https://www.googleapis.com/books/v1/volumes?q=' + value)
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                this.setState({results: []});
            } else {
                this.setState({results: data});
                // ls.set('bookSearch', data)
                console.log(this.state.keyword);
            };
        });
    }

    componentDidMount() {
        var paragraph = this.props.location.pathname; 
        var regex = /[^=]*$/g; 
        var found = paragraph.match(regex); 
        
        this.setState({ searchKeyword: found[0] });
        this.getResults(found);
    }

    inputChange = (e) => {
        this.setState({ searchKeyword: e.target.value });
        history.push('/searchQuery=' + e.target.value);

        this.getResults(e.target.value);
    }

    render() {
        return (
            <div>
                <Input value={this.state.searchKeyword} onChange={this.inputChange}/>
                <SearchResults results={this.state.results} keyword={this.state.searchKeyword}/>
            </div>
        )
    }
}

export default BookSearch;
