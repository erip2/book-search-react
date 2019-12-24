import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends Component {

    componentDidUpdate() {
        console.log(this.props.keyword);
    }

    render() {
        let html;

        if (this.props.results.length == 0 || this.props.results == undefined) {
            return 'Your search results will display here';
        } else {
            html = this.props.results.items.map((res) => {

                let url = '/singlebook/' + res.id;

                return(
                    <Link to={url} key={res.id} keyword={this.props.keyword}>
                        <div className="single-result">
                            <div className="img-container">
                                <img src={res.volumeInfo.imageLinks ? res.volumeInfo.imageLinks.thumbnail : ''}></img>
                            </div>
                            <h3>{res.volumeInfo.title}</h3>
                        </div>
                    </Link>
                )
            })
        }

        return (
            <div className="searchResults">
                {html}
            </div>
        )
    }
}

export default SearchResults;
