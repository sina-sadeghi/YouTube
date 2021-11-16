import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '221213222448-rmk711gps8ab1ja02k2tuio8m2kvj714.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }


    onAuthChange = isSignedIn => {
        if (isSignedIn)
            this.props.signIn(this.auth.currentUser.get().nt);
        else
            this.props.signOut();
    };


    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        }
        else if (this.props.isSignedIn) {
            return (
                <button className='googleAuthOff' onClick={() => { this.auth.signOut() }}>
                    Sign Out
                </button>
            );
        }
        else {
            return (
                <button className='googleAuthOn' onClick={() => { this.auth.signIn() }}>
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div className="googleAuth" >{this.renderAuthButton()}</div>;
    }
}


const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);