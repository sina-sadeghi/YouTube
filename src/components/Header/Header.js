import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showContents } from '../../actions';
import GoogleAuth from '../Profile/GoogleAuth';
import SearchBar from './SearchBar';
import Profile from './Profile';
import './Header.css';
import youtubeLogo from '../../images/youtube-logo.jpg';


const Header = props => {
    return (
        <div className="Header" >
            <SearchBar />

            <Link to="/" className="logoHeader"><img alt="YouTube logo" src={youtubeLogo} />YouTube</Link>

            <div className='profileGoogleAuthHeader'><Profile /><GoogleAuth /></div>

            <span className="material-icons" style={{ cursor: "pointer" }} onClick={() => props.showContents(props.contents)}> menu </span>
        </div>
    );
}

const mapStateToProps = state => {
    return { contents: state.contents }
}

export default connect(mapStateToProps, { showContents })(Header);