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
            appearHome: true,
            showImages: false
        }
        
    }

    userToken = ls.get('Token');

    getResults = (value) => {
        fetch('https://www.googleapis.com/books/v1/volumes?q=' + value + '&maxResults=30')
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                this.setState({results: []});
            } else {
                this.setState({results: data});
                console.log(data);
            };
        });
    }

    componentDidMount() {
        var paragraph = this.props.location.pathname; 
        var regex = /[^=]*$/g; 

        var found = paragraph.match(regex); 

        if(found[0] === '/') {
            return;
        }
        this.setState({ searchKeyword: found[0] });
        this.getResults(found);
    }

    inputChange = (e) => {
        this.setState({ searchKeyword: e.target.value });
        history.push('/searchQuery=' + e.target.value);
        this.setState({ showImages: false });

        this.getResults(e.target.value);
    }

    changeImages = () => {
        this.setState({ showImages: true });
    }

    getData = (val) => {
        // do not forget to bind getData in constructor
        ls.set('Token', val.credential.accessToken);

        this.userToken = ls.get('Token');
    }

    render() {

        return (
            <div>
                <Input value={this.state.searchKeyword} onChange={this.inputChange} sendData={this.getData}/>
                <SearchResults style={{ opacity: this.state.showImages ? 1 : 0 }} results={this.state.results} keyword={this.state.searchKeyword} 
                        showImages={this.state.showImages} change={this.changeImages} token={this.userToken}/>
            </div>
        )
    }
}

export default BookSearch;
