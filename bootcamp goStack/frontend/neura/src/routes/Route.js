import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthLayout from '../pages/_layouts/auth'
import DefaultLayout from '../pages/_layouts/default'

import store from '../store/index'

export default function RouteWrapper({
    component: Component,
    isPrivate = false,
    ...rest
}) {
    const signed = store.getState().auth.signed

    if (!signed && isPrivate) {
        return <Redirect to="/"></Redirect>
    }

    if (signed && !isPrivate) {
        return <Redirect to="/dashboard"></Redirect>
    }

    const Layout = signed ? DefaultLayout : AuthLayout

    return (
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props}></Component>
                </Layout>
            )}
        ></Route>
    )
}