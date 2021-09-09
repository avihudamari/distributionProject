import React, { Component } from 'react';
import classes from './Layout.module.css';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    render() {
        return (
            <Auxiliary>
                <Toolbar
                    userConnected={this.props.userConnected}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;