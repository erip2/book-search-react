import React, { Component } from 'react'

class Input extends Component {
    render() {
        return (
            <div>
                <input type="text" value={this.props.value} onChange={this.props.onChange}/>
            </div>
        )
    }
}

export default Input;
