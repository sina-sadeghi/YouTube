import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import emptyProfile from '../../images/emptyProfile.jfif';


const Profile = props => {
        useEffect(() => {
                if (props.isSignedIn && props.isSignedIn.userInfo === false)
                        window.location.reload();
        }, [props.isSignedIn.isSignedIn])


        if (props.isSignedIn.isSignedIn)
                return (
                        <div className="profileHeader">
                                <Link to={`/profile/${props.isSignedIn.userInfo.userId}`} >
                                        <span> {props.isSignedIn.userInfo.email}</span>
                                        <div><img src={props.isSignedIn.userInfo.image} alt="profile" /></div>
                                </Link>
                        </div>
                );
        else
                return (
                        <div className="profileHeaderOff" >
                                <Link to="/log-in" >log in</Link><Link to="/sign-in" >sign in</Link>
                                <div><img src={emptyProfile} alt="profile" /></div>
                        </div>
                );

};

const mapStateToProps = (state) => {
        return { isSignedIn: state.auth };
};

export default connect(mapStateToProps)(Profile);