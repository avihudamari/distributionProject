import React, { Component } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';

class DatePicker extends Component {
    render() {
        return(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='space-around' height='0px'>
                    <KeyboardDatePicker
                        disablePast={this.props.disablePast}
                        disableToolbar
                        variant='inline'
                        margin='normal'
                        id='date-picker'
                        label={this.props.label}
                        format='dd/MM/yy'
                        value={this.props.selectedDate}
                        onChange={this.props.changeDateHandler}
                        KeyboardButtonProps={{
                            'aria-label': 'change date'
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        );
    }
}

export default DatePicker;