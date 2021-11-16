import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../HomePage/MainVideos.css';

const ContentsMenu = props => {

    const logOut = () => {
        if (props.isSignedIn)
            window.gapi.auth2.getAuthInstance().signOut()
    }



    return (
        <div style={{
            display:
                (props.contents && window.location.pathname === '/' && window.innerWidth <= 503)
                    || (!props.contents && window.location.pathname === '/' && window.innerWidth > 503)
                    || (props.contents && window.location.pathname !== '/')
                    ? "grid" : "none"
        }}
            className="contents">
            <div>

                <div className={window.location.pathname === '/' ? 'contentsMenuOn' : ''} title="Home">
                    <span className="material-icons"> home </span>
                    <Link to="/" >Home</Link>
                </div>
                <hr />

                <div className={window.location.pathname.slice(0, 9) === '/profile/' ? 'contentsMenuOn' : ''} title="Profile">
                    <span className="material-icons"> person </span>
                    <Link to={props.isSignedIn ? `/profile/${props.user.userId}` : "/log-in"}>Profile</Link>
                </div>
                <hr />

                <div className={window.location.pathname === '/saves' ? 'contentsMenuOn' : ''} title="Saved">
                    <span className="material-icons"> bookmarks </span>
                    <Link to="/saves" >Saved</Link>
                </div>
                <hr />

                <div title="Log out">
                    <span className="material-icons"> logout </span>
                    <Link to="/" onClick={() => logOut()}>Exit</Link>
                </div>

            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn, user: state.auth.userInfo, contents: state.contents }
}

export default connect(mapStateToProps)(ContentsMenu);
// style ofthis page is in MainVideos.css