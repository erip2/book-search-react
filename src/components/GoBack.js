import React, { Component } from 'react';
import { useHistory } from 'react-router';

class GoBack extends Component {
    render() {
        return (
            <div>
                <button onClick={() => history.goBack()}>Go Bakc</button>
            </div>
        )
    }
}

export default GoBack;
