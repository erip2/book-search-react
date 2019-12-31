import React, { Component } from 'react';

import GoogleLogin from 'react-google-login';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: ''
        }
        
    }

    render() {

        const responseGoogle = (response) => {
            console.log(response);
            
            if(!response.error) {
                this.setState({loggedIn: true});

                this.setState({ user: response.w3.ig })
            } 
        }

        return (
            <div className="bg-orange-300 h-64 flex items-center justify-center flex-col">
                {this.state.loggedIn === true ? `Welcome, ${this.state.user}` : <GoogleLogin
                    clientId="903214775525-st1d865kef37o42vdgc3rbgu4itau0ni.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />}

                <label className="font text-5xl">Search books:</label>
                <input type="text" value={this.props.value} onChange={this.props.onChange} className="bg-transparent font text-3xl border-dotted border-b-2 border-black w-1/6 outline-none text-center"/>
            </div>
        )
    }
}

export default Input;
