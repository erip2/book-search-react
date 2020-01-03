import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import * as searchLoading from '../styles/imageLoadLoading.json';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showImages: false
        }
    }

    render() {
        let html;

        const defaultOptions = {
            color: '#fff',
            loop: true,
            autoplay: true,
            animationData: searchLoading.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }

        if (this.props.results.length == 0 || this.props.results == undefined) {
            return 'Your search results will display here';
        } else  {
            html = this.props.results.items.map((res, i, arr) => {
                if(arr.length - 1 == i) {
                    let url = '/singlebook/' + res.id;

                return(
                    <Link to={url} keyword={this.props.keyword} className="img-co">
                        <div className="single-result">
                            <div className="img-container">
                                <img onLoad={this.props.change} src={res.volumeInfo.imageLinks ? res.volumeInfo.imageLinks.thumbnail : ''}></img>
                            </div>
                            <h3>{res.volumeInfo.title}</h3>
                        </div>
                    </Link>
                )
                } else {
                    let url = '/singlebook/' + res.id;

                return(
                    <Link to={url} keyword={this.props.keyword} className="img-co">
                        <div className="single-result">
                            <div className="img-container">
                                <img src={res.volumeInfo.imageLinks ? res.volumeInfo.imageLinks.thumbnail : ''}></img>
                            </div>
                            <h3>{res.volumeInfo.title}</h3>
                        </div>
                    </Link>
                )
                }
            })
        }

        return (
            <React.Fragment>
                <div className="searchResults" style={{ display: this.props.showImages ? 'grid' : 'none' }}>
                    {html}
                </div>
                <div style={{ opacity: !this.props.showImages ? 1 : 0 }}>
                    <FadeIn>
                        <div class="flex justify-content-center align-items-center h-100">
                            <Lottie options={defaultOptions} height={400} width={400} />                      
                        </div>
                    </FadeIn>
                </div>
            </React.Fragment>
        )
    }
}

export default SearchResults;
