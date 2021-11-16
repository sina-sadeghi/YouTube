import React from 'react';
import { connect } from 'react-redux';
import GoogleAuth from '../Profile/GoogleAuth';
import ContentsMenu from '../ContentsMenu/ContentsMenu';

const InAccessible = props => {
    if (!props.logedIn.isSignedIn)
        return (
            <div>
                <div className={props.contents ? "videoContentsMenu" : ""} ><ContentsMenu /></div>
                <div style={{ textAlign: "center", fontSize: "3rem", color: "#e11a1a" }}>
                    Plaese Sign in<br />
                    <div className="material-icons" style={{
                        textAlign: "center",
                        fontSize: "3rem",
                        color: "#e11a1a",
                        display: window.location.pathname === "/log-in" || window.location.pathname === "/sign-in"
                            ? "none" : "block"
                    }}>
                        sentiment_dissatisfied
                    </div>
                    <GoogleAuth />
                </div>
            </div>
        );
    else
        return (
            <div>
                <div className={props.contents ? "videoContentsMenu" : ""} ><ContentsMenu /></div>
                <div style={{ textAlign: "center", fontSize: "3rem", color: "#3b9b19" }}>
                    You are Signed in<br />
                    <div className="material-icons" style={{
                        textAlign: "center",
                        fontSize: "3rem",
                        color: "#3b9b19"
                    }}>
                        done
                    </div>
                </div>
            </div>
        );
};

const mapStateToProps = state => {
    return { logedIn: state.auth, contents: state.contents }
}

export default connect(mapStateToProps)(InAccessible);