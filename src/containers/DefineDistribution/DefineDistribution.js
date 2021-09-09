import React, { Component } from 'react';
import classes from './DefineDistribution.module.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import { googleMapsApiKey, locationiqKey } from '../../shared/codes';
import Geocode from 'react-geocode';
import Table from  '../Tables/DefineTable/DefineTable';
import Form from '../Form/Form';
import DatePicker from '../DatePicker/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { greenMarker, redMarker } from '../../shared/svg/svgMarkers';
import axios from 'axios';
import { getCenter } from '../../shared/functions';

Geocode.setApiKey(googleMapsApiKey);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class DefineDistribution extends Component {

    state = {  
        selectedDate: new Date(),
        data: [],
        editIdx: -1,
        openSnackbar: false
    }

    //datePicker function
    changeDateHandler = (newDate) => {
        this.setState({
            selectedDate: newDate,
            data: []
        });
    }

    //table functions
    handleRemove = i => {
        this.setState(state => ({
            data: state.data.filter((row, j) => j !== i)
        }));
    };
    
    startEditing = i => {
        this.setState({ editIdx: i });
    };
    
    stopEditing = () => {
        this.setState({ editIdx: -1 });
    };
    
    handleChange = (e, name, i) => {
        if (name == 'food' || name == 'medicines') {
            this.setState(state => ({
                data: state.data.map(
                  (row, j) => (j === i ? { ...row, [name]: e.target.checked } : row)
                )
              }));
        }
        else {
            this.setState(state => ({
                data: state.data.map(
                  (row, j) => (j === i ? { ...row, [name]: e.target.value } : row)
                )
            }));
        } 
    };
    //table function end

    //submit distribution function
    submitDistribution = async () => {
        await axios.post("/distributions/addDistributions", this.state.data)
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.log(error);
        });       
        this.setState({  
            selectedDate: new Date(),
            data: [],
            editIdx: -1,
            openSnackbar: true
        })
    }

    closeSnackbarHandler = () => {
        this.setState({  
            openSnackbar: false
        })
    }

    // getCenter = () => {
    //     var bound = new window.google.maps.LatLngBounds(); 
        
    //     this.state.data.map(row =>
    //         bound.extend(new window.google.maps.LatLng(row.lat, row.lng) )
    //     )

    //     return bound.getCenter();
    // }
    
    googleMapURL = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsApiKey + "&v=3.exp&libraries=geometry,drawing,places";

    zoomOptions = {
        minZoom: 3,
        maxZoom: 18,
    }
    
    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={15}
              options={this.zoomOptions}
              defaultCenter={{ lat: 31.820637792650984, lng: 35.24921573570617 }}            
              center={getCenter(this.state.data)} 
            >
                {this.state.data.map(row =>
                        <Marker
                            animation={window.google.maps.Animation.DROP}
                            position={{ lat: row.lat, lng: row.lng }}
                            icon={redMarker}
                        />
                )}
            </GoogleMap>           
        ));
        
        let table = (
            <Table
                handleRemove={this.handleRemove}
                startEditing={this.startEditing}
                editIdx={this.state.editIdx}
                stopEditing={this.stopEditing}
                handleChange={this.handleChange}
                data={this.state.data}
                header={[
                {
                    name: "כתובת",
                    prop: "address"
                },
                {
                    name: "טלפון",
                    prop: "phoneNumber"
                },
                {
                    name: "מזון",
                    prop: "food"
                },
                {
                    name: "תרופות",
                    prop: "medicines"
                },
                {
                    name: "מחלק",
                    prop: "distributor"
                }
                ]}
            />        
        )

        let submitButton = (
            <Button
                variant="contained"
                color="secondary"
                onClick={this.submitDistribution}
            >
                אישור
            </Button>
        );

        if (this.state.data.length == 0) {
            submitButton = null;
            table = null;
        }
        
        let map =
            <div className={classes.gridItem}>
                <MapWithAMarker
                googleMapURL={this.googleMapURL}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
            </div>
            
        if (this.state.data.length == 0) {
            map =
            <div className={classes.gridItem, classes.noMap}>
                <div className={classes.noMapLabel}>הוסף כתובות והם יוצגו במפה</div>
            </div>
        }

        return (
            <div className={classes.gridContainer}>
                {map}
                <div className={classes.gridItem}>
                    <DatePicker label='בחר תאריך' disablePast selectedDate={this.state.selectedDate} changeDateHandler={this.changeDateHandler}/>
                    <MuiThemeProvider>
                        <Form
                            onSubmit={submission =>
                                {
                                    let updatedSubmission = {...submission, date: this.state.selectedDate.toLocaleDateString()};
                                    console.log(updatedSubmission);
                                    this.setState({
                                        data: [...this.state.data, updatedSubmission]
                                    })
                                }                                
                            }
                        />                       
                        {table}                
                    </MuiThemeProvider>
                    <div className={classes.submitDistributionButton}>
                        {submitButton}
                        <Snackbar open={this.state.openSnackbar} autoHideDuration={2000} onClose={this.closeSnackbarHandler}>
                            <Alert severity="success" onClose={this.loseSnackbarHandler}>
                                הגדרת החלוקה אושרה
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
            </div>
        );
    }
}

export default DefineDistribution;