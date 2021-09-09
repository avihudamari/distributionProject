import React from 'react';
import classes from './Logo.module.css';
import Logo from '../../assets/images/logo.jpg';

const logo = (props) => (
    <div
        className={classes.Logo}
        style={{height: props.height,
                marginBottom: props.marginBottom}}>
        <img src={Logo} alt="Logo" width={props.width}></img>
    </div>
);

export default logo;