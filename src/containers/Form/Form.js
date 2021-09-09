import React from "react";
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MyAutoComplete from '../MyAutoComplete/MyAutoComplete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";

const styles = theme => ({
  form: {
    display: 'inline-flex',
    direction: 'rtl',
    justifyContent: 'space-around',
    marginInline: '20px',
    width: '100%',
  },
  textField: {
    width: '90px',
  },
  button: {
    height: 'fit-content',
    alignSelf: 'center'
  },
  autoComplete: {
    textAlign: 'end'
  },
  formContainer: {
    marginBlock: '35px'
  }
});

class Form extends React.Component {
  state = {
    address: "",
    lat: "",
    lng: "",
    phoneNumber: "",
    food: false,
    medicines: false,
    distributor: "",
    done: false,
    distributorList: []
  };

  componentDidMount () {
    axios.post("/users/getDistributors")
        .then(res => {
          this.setState({
            distributorList: res.data
          })
        })
        .catch(error => {
            console.log(error);
        });
  }

  change = e => {
    if (e.target.id == 'food' || e.target.id == 'medicines') {
      this.setState({
        [e.target.id]: e.target.checked
      });
    }
    else {
      this.setState({
        [e.target.id]: e.target.value
      });
    } 
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    // clear form
    this.setState({
      address: "",
      lat: "",
      lng: "",
      phoneNumber: "",
      food: false,
      medicines: false,
      distributor: "",
      done: false
    });
  };

  selectAddressHandler = (state) => {
    this.setState({
      address: state.address,
      lat: state.lat,
      lng: state.lng
    });
  }

  changeDistributorSelect = (event) => {
    this.setState({
      distributor: event.target.value
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.formContainer}>
        <MyAutoComplete
          onSelectAddress={this.selectAddressHandler}
          className={classes.autoComplete}
        />
        <form className={classes.form}>
        <TextField className={classes.textField}
          id="address"
          label="כתובת"
          placeholder="כתובת"
          value={this.state.address}
          onChange={e => this.change(e)}
          floatingLabelFixed
          disabled
        >
          <MyAutoComplete/>
        </TextField>
        <br />
        <TextField className={classes.textField}
          id="phoneNumber"
          label="טלפון"
          placeholder="טלפון"
          value={this.state.phoneNumber}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <FormControlLabel
          control= {
            <Checkbox
              id="food"
              checked={this.state.food}
              onChange={e => this.change(e)}
            />
          }
          label='מזון'
        />       
        <FormControlLabel
          control= {
            <Checkbox
              id="medicines"
              checked={this.state.medicines}
              onChange={e => this.change(e)}
            />
          }
          label='תרופות'
        />   
        <br />
        <FormControl style={{width: 100}}>
          <InputLabel id="demo-simple-select-label">מחלק</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.distributor}
            onChange={this.changeDistributorSelect}
          >
            {this.state.distributorList.map(dist =>
              <MenuItem value={dist.name}>{dist.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <br />
        <Button variant="contained"
                color="secondary"
                onClick={e => this.onSubmit(e)}
                className={classes.button}>
            הוסף
        </Button>
      </form>
      </div>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
