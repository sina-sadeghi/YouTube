import React from 'react';
import { connect } from 'react-redux';
import Error404 from '../OtherPage/Error404';
import Loading from '../OtherPage/Loading';
import history from '../OtherPage/history';
import ContentsMenu from '../ContentsMenu/ContentsMenu';
import GoogleAuth from './GoogleAuth';
import InAccessible from '../OtherPage/InAccessible';
import './Profile.css';
import '../Videos/Videos.css';


const Profile = props => {


    const page = () => {
        return (
            <div className="profile" >
                <img
                    alt="profile"
                    src={props.logedIn.userInfo.image}
                />
                <table>
                    <tbody>

                        <tr>
                            <td>first name:</td>
                            <td>{props.logedIn.userInfo.firstName}</td>
                        </tr>

                        <tr>
                            <td>last name:</td>
                            <td>{props.logedIn.userInfo.lastName}</td>
                        </tr>

                        <tr>
                            <td>gender: </td>
                            <td>{props.logedIn.userInfo.gender ? props.logedIn.userInfo.gender : 'i prefer not to say'}</td>
                        </tr>

                        <tr>
                            <td>birth day: </td>
                            <td>{props.logedIn.userInfo.birthDay ? props.logedIn.userInfo.birthDay : 'empty'}</td>
                        </tr>

                        <tr>
                            <td>phone number: </td>
                            <td>{props.logedIn.userInfo.phoneNumber ? props.logedIn.userInfo.phoneNumber : 'empty'}</td>
                        </tr>

                        <tr>
                            <td>email: </td>
                            <td>{props.logedIn.userInfo.email}</td>
                        </tr>

                    </tbody>
                </table>

                <div>
                    <button onClick={() => history.push(`${window.location.pathname}/edit`)}>
                        <span>Edit profile</span>
                    </button>
                </div>

            </div >
        );
    }



    const renderPage = () => {
        if (props.logedIn.isSignedIn)
            if (window.location.pathname === `/profile/${props.logedIn.userInfo.userId}`)
                return <div>{page()}</div>;
            else
                return <div><Error404 /></div>;

        else if (props.logedIn.isSignedIn === false)
            return (
                <div>
                    <InAccessible />
                </div>
            );
        else
            return <div><Loading /></div>;
    }


    return (
        <div
            style={{ display: "grid", justifyContent: "center" }}
        >
            <div className={props.contents ? "videoContentsMenu" : ""} >
                <ContentsMenu />
            </div>
            {renderPage()}
        </div>
    );

}

const mapStateToProps = state => {
    return { logedIn: state.auth, contents: state.contents }
}

export default connect(mapStateToProps)(Profile);
