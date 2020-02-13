import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './pages/Main'
import Repositories from './pages/Repositories'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}></Route>
                <Route path="/repos" component={Repositories}></Route>
            </Switch>
        </BrowserRouter>
    )
}