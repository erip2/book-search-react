import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends Component {

    componentDidUpdate() {
        // let html;

        // if (this.props.results.length == 0) {
        //     console.log('none')
        // } else {
        //     html = this.props.results.items.map((res) => {
        //         return(
        //             <div key={res.id}>
        //                 <h3>{res.volumeInfo.title}</h3>
        //             </div>
        //         )
        //     })
        // }
    }

    render() {
        let html;

        if (this.props.results.length == 0 || this.props.results == undefined) {
            console.log('none')
        } else {
            html = this.props.results.items.map((res) => {

                let url = '/singlebook/' + res.id;

                return(
                    <Link to={url} key={res.id}>
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
