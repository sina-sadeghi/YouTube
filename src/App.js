import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './components/OtherPage/history';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import SearchResponse from './components/Header/SearchResponse';
import InAccessible from './components/OtherPage/InAccessible';
import Profile from './components/Profile/Profile';
import ProfileEdit from './components/Profile/ProfileEdit';
import Videos from './components/Videos/Videos';
import SaveMessager from './components/Saves/SaveMessager';
import Error404 from './components/OtherPage/Error404';
import Footer from './components/Footer/Footer';


class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <Header />
                <hr />
                <Switch>
                    <Route path='/' exact component={HomePage} />
                    <Route path='/search/:id' exact component={SearchResponse} />
                    <Route path='/log-in' exact component={InAccessible} />
                    <Route path='/sign-in' exact component={InAccessible} />
                    <Route path='/profile/:id' exact component={Profile} />
                    <Route path='/profile/:id/edit' exact component={ProfileEdit} />
                    <Route path='/video/:id' exact component={Videos} />
                    <Route path='/saves' exact component={SaveMessager} />
                    <Route path='/:id' exact component={Error404} />
                </Switch>
                <hr />
                <Footer />
            </Router>
        );
    }
}
export default App;