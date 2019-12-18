import React, { Component } from 'react'

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
                return(
                    <div key={res.id}>
                        <h3>{res.volumeInfo.title}</h3>
                    </div>
                )
            })
        }

        return (
            <div>
                {html}
            </div>
        )
    }
}

export default SearchResults;
