import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import MyFavoritesBooks from './pages/MyFavoritesBooks';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={Home}/>
                <Route path="/my-favorites-books" component={MyFavoritesBooks}/>
            </Switch>
        )
    }
}

export default Routes;