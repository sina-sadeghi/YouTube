import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { searcherVideos } from '../../actions';
import history from '../OtherPage/history';
import './Header.css';


const SearchBar = props => {

    const onSubmit = e => {
        history.push(`/search/${e.search}`)
        props.searcherVideos(e, 20)
    }


    return (
        <div className="searchBar" >
            <form onSubmit={props.handleSubmit(onSubmit)}>
                <button className="material-icons">
                    search
                </button>
                <Field name="search" component="input" type="search" placeholder="search..." />
            </form>
        </div>
    );

};


export default connect(null, { searcherVideos })(
    reduxForm({
        form: 'SearchBar',
    })
        (SearchBar))