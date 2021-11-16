import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { editUser, genderUserEdit } from '../../actions';
import ContentsMenu from '../ContentsMenu/ContentsMenu';
import Error404 from '../OtherPage/Error404';
import Loading from '../OtherPage/Loading';
import history from '../OtherPage/history';
import InAccessible from '../OtherPage/InAccessible';
import './ProfileEdit.css';
import '../Videos/Videos.css';


class ProfileEdit extends React.Component {


    componentDidMounth = () => {
        if (this.props.user.gender)
            this.props.genderUserEdit(this.props.user.gender)
        else
            this.props.genderUserEdit("i prefer not to say")
    }


    genderInput = ({ input, label }) => {
        return (
            <div className="editProfileGender">
                <label>{label}</label>

                <span>
                    male
                    <input
                        {...input}
                        type="radio"
                        value="male"
                        name="gender"
                        checked={this.props.genderUser === "male"}
                        onClick={() => this.props.genderUserEdit("male")}
                    />
                </span>

                <span>
                    female
                    <input
                        {...input}
                        type="radio"
                        value="female"
                        name="gender"
                        checked={this.props.genderUser === "female"}
                        onClick={() => this.props.genderUserEdit("female")}
                    />
                </span>

                <span>
                    other
                    <input
                        {...input}
                        type="radio"
                        value="other"
                        name="gender"
                        checked={this.props.genderUser === "other"}
                        onClick={() => this.props.genderUserEdit("other")}
                    />
                </span>

                <span>
                    i prefer not to say
                    <input
                        {...input}
                        type="radio"
                        value="i prefer not to say"
                        name="gender"
                        checked={this.props.genderUser === "i prefer not to say"}
                        onClick={() => this.props.genderUserEdit("i prefer not to say")}
                    />
                </span>
            </div>
        )
    }

    renderInput = ({ input, label, meta, type, disable }) => {
        return (
            <div className="editProfilecase">
                <label>{label}</label>
                <input
                    {...input}
                    autoComplete="off"
                    placeholder={"empty!"}
                    type={type} disabled={disable}
                />
                <span>{meta.touched && meta.error ? meta.error : null}</span>
            </div>
        );
    };

    onSubmit = formValue => {
        this.props.editUser(formValue.id, formValue)
        history.push(`/profile/${this.props.logedIn.userInfo.userId}`)
    }


    page = () => {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

                    <h3>Edit Profile</h3>

                    <div>
                        <Field name="email" component={this.renderInput} label="email:" type="email" disable={true} />
                        <Field name="firstName" component={this.renderInput} label="first name:" type="text" disable={false} />
                        <Field name="lastName" component={this.renderInput} label="last name:" type="text" disable={false} />
                        <Field name="birthDay" component={this.renderInput} label="birth day:" type="date" disable={false} />
                        <Field name="phoneNumber" component={this.renderInput} label="phone number:" type="tel" disable={false} />
                        <Field name="gender" component={this.genderInput} label="gender: " />
                    </div>

                    <div className="buttonEditProfile">
                        <span>
                            <input
                                type="button"
                                value="Cancel ×"
                                onClick={() => history.push(`/profile/${this.props.user.userId}`)}
                            />
                        </span>
                        <button type="submit"><span>Submit »</span></button>
                    </div>

                </form>
            </div>
        );
    }

    render() {
        if (this.props.logedIn.isSignedIn)
            if (window.location.pathname === `/profile/${this.props.logedIn.userInfo.userId}/edit`)
                return (
                    <div>
                        <div className={this.props.contents ? "videoContentsMenu" : ""} ><ContentsMenu /></div>
                        <div className='editProfile'>{this.page()}</div>
                    </div>
                );
            else
                return <div><Error404 /></div>;
        else if (this.props.logedIn.isSignedIn === false)
            return (
                <div>
                    <div className={this.props.contents ? "videoContentsMenu" : ""} ><ContentsMenu /></div>
                    <InAccessible />
                </div>
            );
        else
            return (
                <div>
                    <div className={this.props.contents ? "videoContentsMenu" : ""} ><ContentsMenu /></div>
                    <Loading />
                </div>
            );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.firstName)
        errors.firstName = 'Your first name is empty!';

    if (!formValues.lastName)
        errors.lastName = 'Your last name is empty!';

    if (formValues.phoneNumber && !/^[0-9+]{11,13}$/i.test(formValues.phoneNumber))
        errors.phoneNumber = 'this number is invalid';

    return errors;
};

const mapStateToProps = state => {
    return {
        logedIn: state.auth,
        initialValues: state.auth.userInfo,
        user: state.auth.userInfo,
        contents: state.contents,
        genderUser: state.genderUser
    }
}

export default connect(mapStateToProps, { editUser, genderUserEdit })(
    reduxForm({
        form: 'profileEdit',
        enableReinitialize: true,
        validate
    })
        (ProfileEdit))