import React, { Component } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {

    render() {
        //disconnected
        if (this.props.userConnected == null) {
            return (
                <ul className={classes.NavigationItems}>
                    <NavigationItem link='/' exact>התחברות</NavigationItem>
            </ul>
            )
        }
        else {
            //admin connected
            if (this.props.userConnected.isAdmin) {
                return (
                    <ul className={classes.NavigationItems}>
                        <NavigationItem link='/logout' exact disconnect>התנתקות</NavigationItem>
                        <NavigationItem link='/defineDistribution'>הגדרת חלוקה</NavigationItem>
                        <NavigationItem link='/trackDistribution'>מעקב חלוקה</NavigationItem>
                        <NavigationItem link='/blog'>סיכומי יום</NavigationItem>
                        <NavigationItem link='/chat'>צ'אט</NavigationItem>
                        <NavigationItem link='/control'>בקרה</NavigationItem>
                        {/* <NavigationItem link='/manageDistributors'>ניהול מחלקים</NavigationItem> */}
                </ul>
                )
            }
            //noAdmin connected
            else {
                return (
                    <ul className={classes.NavigationItems}>
                        <NavigationItem link='/logout' exact disconnect>התנתקות</NavigationItem>
                        <NavigationItem link='/workArrangement'>סידור עבודה</NavigationItem>
                        <NavigationItem link='/blog'>סיכומי יום</NavigationItem>
                        <NavigationItem link='/chat'>צ'אט עם מנהל</NavigationItem>
                </ul>
                )
            }
        }
    }
}

export default NavigationItems;