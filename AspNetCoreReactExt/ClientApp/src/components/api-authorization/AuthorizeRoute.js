import React from 'react'
import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { ApplicationPaths, QueryParameterNames } from './ApiAuthorizationConstants'
import authService from './AuthorizeService'

export default class AuthorizeRoute extends Component {

    _isAdult = false;
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            authenticated: false,
            isAdult: false
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.authenticationChanged());
        this.populateAuthenticationState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    render() {
        const { ready, authenticated, isAdult } = this.state;
        var link = document.createElement("a");
        link.href = this.props.path;
        const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
        const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURIComponent(returnUrl)}`;
        if (!ready) {
            return <div></div>;
        } else {
            if (authenticated) {
                if (this.props.forAdults && !isAdult) {
                    return <Navigate replace to={'/403'} />
                }
                const { element } = this.props;
                return element;
            }
            return <Navigate replace to={redirectUrl} />;
        }
    }

    async isAdult() {
        const token = await authService.getAccessToken();
        const response = await fetch('Identity/Account/IsAdult', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        return await response.json();
    }

    async populateAuthenticationState() {
        const authenticated = await authService.isAuthenticated();
        let isAdult = false;
        if (authenticated) {
            isAdult = await this.isAdult();
        }
        this.setState({ ready: true, authenticated: authenticated, isAdult: isAdult });
    }

    async authenticationChanged() {
        this.setState({ ready: false, authenticated: false });
        await this.populateAuthenticationState();
    }
}
