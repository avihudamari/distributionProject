import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Logout extends Component {
    componentDidMount() {
        this.props.disconnected();
        window.localStorage.removeItem('user');
    }

    render() {
        return <Redirect to='/'/>
    }
}

export default Logout;
