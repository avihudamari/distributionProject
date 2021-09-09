import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import Logo from '../../components/Logo/Logo';
import classes from './Auth.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class Auth extends Component {
    state = {
        isSignUp: false,
        pressConnect: false
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    }

    onSubmitHandler = (event) => {
      event.preventDefault();
      this.setState({pressConnect: true});
    }

    render() {
        let title = <div className={classes.Title}>כניסה</div>;

        if (this.state.isSignUp) {
            title = <div className={classes.Title}>הרשמה</div>;
        }

        let form = (
        <form onSubmit={this.onSubmitHandler} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="כתובת מייל"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמא"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.MyButton}
          >
            {this.state.isSignUp ? "הירשם" : "התחבר"}
          </Button>
        </form>
        );

        let redirectIfPress = null;
        if (this.state.pressConnect) {
          redirectIfPress = <Redirect to='/defineDistribution'/>
        }

        return (
          <Auxiliary>
            {/*<div className={classes.Background}></div>*/}
            <div className={classes.Auth}>
              {redirectIfPress}
              {title}
              {form}
              <Button color="primary" className={classes.MyButton} onClick={this.switchAuthModeHandler}>
                {this.state.isSignUp ? "משתמש רשום? לחץ לכניסה" : "משתמש חדש? לחץ להרשמה"}
              </Button>
            </div>
          </Auxiliary>   
        );
    }
}

export default Auth;