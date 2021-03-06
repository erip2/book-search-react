import React, { Component } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

class GoogleAuth extends Component {


    render() {

        const {
            user,
            signOut,
            signInWithGoogle,
        } = this.props;

        const btnStyles = {
            alignSelf: 'flex-end',
            border: '1px solid',
            borderRadius: '10px',
            padding: '7px',
            marginTop: '-40px',
            marginRight: '10px'
        }

        let dataForInput;

        let signInWithGoogleData = () => {
            signInWithGoogle().then(function(result) {
                dataForInput = result;
                sendDataAbove();
            });
        }

        let sendDataAbove = () => {
            this.props.sendData(dataForInput);
        }

        return (
            <React.Fragment>
                {
                    user 
                    ? <p>Hello, {user.displayName}</p>
                    : ''
                }
                {
                    user
                    ? <button onClick={signOut}>Sign out</button>
                    : <button onClick={signInWithGoogleData} style={btnStyles}><FontAwesomeIcon icon={faGoogle} className="mr-2"/>Sign in</button>
                }
            </React.Fragment>
        )
    }
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

providers.googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
providers.googleProvider.addScope('https://www.googleapis.com/auth/books');

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(GoogleAuth);
