import React from 'react';
import Main from '../components/Main';
import Beer from '../components/Beer';
import Layout from '../components/Layout';
import Recipe from '../components/Recipe';
import { Route, IndexRoute } from 'react-router';

module.exports = (
    <Route path="/" component={Main}>
        <IndexRoute component={Layout} />
    </Route>
);
