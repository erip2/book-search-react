import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class GoBack extends Component {

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        const divStyles = {
            color: "#fff",
            backgroundColor: "orange",
            padding: "20px 0"
        }

        const btnContainer = {
            width: '80%',
            margin: 'auto',
            cursor: 'pointer'
        }

        return (
            <div style={divStyles}>
                <div onClick={this.goBack} style={btnContainer}>
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>
                    <button>Go Back</button>
                </div>
            </div>
        )
    }
}

export default withRouter(GoBack);
