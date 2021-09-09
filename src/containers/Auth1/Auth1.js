import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import Logo from '../../components/Logo/Logo';
import classes from './Auth1.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Auth extends Component {
    state = {
        isSignUp: false,
        pressConnect: false,
        email: null,
        password: null,
        name: null,
        phoneNumber: null,
        success: false,
        error: false,
        openSnackbar: false,
        successLogin: false,
        adminLogin: false,
        isAdminRegister: false
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.state.isSignUp) {
            const newUser = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                phoneNumber: this.state.phoneNumber,
                isAdmin: this.state.isAdminRegister
              };
          
              try {
                await axios.post("/users/register", newUser);
                this.setState({
                    error: false,
                    success: true,
                    isSignUp: false
                })
              } catch (err) {
                  this.setState({
                      error: true
                  })
              }
        }
        else {
            const user = {
                email: this.state.email,
                password: this.state.password,
              };
              try {
                const res = await axios.post("/users/login", user);
                window.localStorage.setItem('user', JSON.stringify(res.data));            
                if (res.data.isAdmin) {
                  this.setState({
                    successLogin: true,
                    adminLogin: true
                  });
                  this.props.connected(res.data);
                }
                else {
                  this.setState({
                    successLogin: true,
                    adminLogin: false
                  });
                  this.props.connected(res.data);
                }
              } catch (err) {
                this.setState({error: true});
              }
        }
    };

    changeHandler = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    }

    onSubmitHandler = (event) => {
      event.preventDefault();
      this.setState({pressConnect: true});
    }

    closeSnackbarHandler = () => {
        this.setState({  
            success: false,
            error: false
        })
    }

    changeIsAdminRegisterHandler = (e) => {
      this.setState({
        isAdminRegister: e.target.checked
      })
    }

    render() {
        let title = <div className={classes.Title}>כניסה</div>;

        if (this.state.isSignUp) {
            title = <div className={classes.Title}>הרשמה</div>;
        }

        let form = (
        <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="כתובת מייל"
            name="email"
            //autoComplete="email"
            autoFocus
            value={this.state.email}
            onChange={e => this.changeHandler(e)}
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
            //autoComplete="current-password"
            value={this.state.password}
            onChange={e => this.changeHandler(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.MyButton}
          >
              התחבר
          </Button>
        </form>
        );

        if (this.state.isSignUp) {
            form = (
                <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
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
                    value={this.state.email}
                    onChange={e => this.changeHandler(e)}
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
                    value={this.state.password}
                    onChange={e => this.changeHandler(e)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="שם"
                    //type="password"
                    id="name"
                    autoComplete="name"
                    value={this.state.name}
                    onChange={e => this.changeHandler(e)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="phoneNumber"
                    label="טלפון"
                    //type="password"
                    id="phoneNumber"
                    autoComplete="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={e => this.changeHandler(e)}
                  />
                  <FormControlLabel style={{marginBottom: '15px', marginTop: '10px'}}
                    control={
                      <Switch
                        checked={this.state.isAdminRegister}
                        onChange={this.changeIsAdminRegisterHandler}
                        name="isAdmin"
                        color="primary"
                      />
                    }
                    label="הירשם כמנהל חלוקה"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.MyButton}
                  >
                    הירשם
                  </Button>
                </form>
                );
        }

        let snackbar = null;

        if (this.state.success) {
            snackbar = 
                <Snackbar open={this.state.success} autoHideDuration={2500} onClose={this.closeSnackbarHandler}>
                <Alert severity="success" onClose={this.loseSnackbarHandler}>
                    ההרשמה הצליחה, אתה יכול להתחבר עכשיו
                </Alert>
                </Snackbar>
        }

        if (this.state.error) {
            snackbar = 
                <Snackbar open={this.state.error} autoHideDuration={2500} onClose={this.closeSnackbarHandler}>
                <Alert severity="error" onClose={this.loseSnackbarHandler}>
                    משהו השתבש, אנא נסה שוב
                </Alert>
                </Snackbar>
        }

        let redirectIfLogin = null;
        if (this.state.successLogin) {
          if (this.state.adminLogin) {
            redirectIfLogin = <Redirect to='/defineDistribution'/>
          }
          else {
            redirectIfLogin = <Redirect to='/workArrangement'/>
          }
        }

        return (
          <Auxiliary>
            {/*<div className={classes.Background}></div>*/}
            <div className={classes.Auth}>
              {redirectIfLogin}
              {title}
              {form}
              <Button color="primary" className={classes.MyButton} onClick={this.switchAuthModeHandler}>
                {this.state.isSignUp ? "משתמש רשום? לחץ לכניסה" : "משתמש חדש? לחץ להרשמה"}
              </Button>
              {snackbar}
            </div>
          </Auxiliary>   
        );
    }
}

export default Auth;