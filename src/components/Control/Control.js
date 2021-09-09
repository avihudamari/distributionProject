import React, { Component } from 'react';
import classes from './Control.module.css';
//import InDevelopment from '../InDevelopment/InDevelopment';
import LineChart from '../LineChart/LineChart';
import DatePicker from '../../containers/DatePicker/DatePicker';

class Control extends Component {
    state = {
        selectedDate: new Date()
    }

    changeDateHandler = (e) => {
        console.log("onChange: " + e)
    }
    render() {
        return (
            <div className={classes.gridContainer}>
                <div className={classes.gridItem}>
                    <LineChart/>
                </div>
                <div className={classes.gridItem}>
                    <DatePicker label='בחר שבוע' selectedDate={this.state.selectedDate} changeDateHandler={this.changeDateHandler}/>
                </div>
            </div>        
        );
    }
}

export default Control;