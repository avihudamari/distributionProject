import React, { Component } from 'react';
import classes from './WorkArrangement.module.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import { googleMapsApiKey, locationiqKey } from '../../shared/codes';
import Geocode from 'react-geocode';
import Table from  '../Tables/ArrangementTable/ArrangementTable';
import Form from '../Form/Form';
import DatePicker from '../DatePicker/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { redMarker , greenMarker } from '../../shared/svg/svgMarkers';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { getCenter } from '../../shared/functions';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class WorkArrangement extends Component {
    
    async componentDidMount () {
        const sendData = {
            user: this.props.userConnected,
            date: new Date().toLocaleDateString()
        }
        this.setState({loading:true});
        await axios.post("/distributions/getDistributions", sendData)
        .then(res => {
            this.setState({
                data: res.data,
                loading: false
            })
            
        })
        .catch(error => {
            console.log(error);
            this.setState({loading: false});
        });
    }

    state = {  
        selectedDate: new Date(),
        data: [],
        editIdx: -1,
        openSnackbar: false,
        loading: false
    }

    
    //datePicker function
    changeDateHandler = async (newDate) => {
        this.setState({
            selectedDate: newDate,
            loading: true
        });
        const sendData = {
            user: this.props.userConnected,
            date: newDate.toLocaleDateString()
        }

        await axios.post("/distributions/getDistributions", sendData)
        .then(res => {
            this.setState({
                data: res.data,
                loading: false
            })
        })
        .catch(error => {
            console.log(error);
            this.setState({
                loading: false
            })
        });
    }

    //table functions
    handleChange = (e, name, i) => {
        let updateData = this.state.data;
        updateData.map(
            (row, j) => (j === i ?  row.isDone=e.target.checked : null)
        )
        console.log(updateData);
        this.setState({data: updateData});
    };
    //table function end

    //submit distribution function
    submitDistribution = async () => {       
        await axios.post("/distributions/updateDistributions", this.state.data)
        .then(res => {
            this.setState({
                openSnackbar: true
            })
            //this.setState({
            //    data: res.data,
            //    loading: false
            //})
        })
        .catch(error => {
            console.log(error);
            //this.setState({
            //    loading: false
            //})
        });
    }

    closeSnackbarHandler = () => {
        this.setState({  
            openSnackbar: false
        })
    }

    refreshHandler = () => {
        this.changeDateHandler(this.state.selectedDate)
    }
    
    googleMapURL = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsApiKey + "&v=3.exp&libraries=geometry,drawing,places";

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={15}
              defaultCenter={{ lat: 31.820637792650984, lng: 35.24921573570617 }}            
              center={getCenter(this.state.data)}
            >
                {this.state.data
                .map(row =>
                        <Marker
                            animation={window.google.maps.Animation.DROP}
                            position={{ lat: eval(row.lat), lng: eval(row.lng) }}
                            icon={row.isDone ? greenMarker : redMarker }                            
                        /> 
                )}
            </GoogleMap>           
        ));
        
        let table = (
            <Table
                editIdx={this.state.editIdx}
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
                // {
                //     name: "מחלק",
                //     prop: "distributor"
                // },
                {
                    name: "בוצע",
                    prop: "isDone"
                },
                ]}
            />        
        )

        let submitButton = (
            <Button
                variant="contained"
                color="secondary"
                onClick={this.submitDistribution}
            >
                דווח
            </Button>
        );

        if (this.state.data.length == 0) {
                table = <Card className={classes.card}>
                <CardContent>
                    לא מוגדרות לך חלוקות ביום זה   
                </CardContent>
            </Card>;
            submitButton = null;
        }

        let map =
            <div className={classes.gridItem, classes.map}>
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
                <div className={classes.noMapLabel}>ביום עם חלוקות, הן יוצגו פה במפה</div>
            </div>
        }

        let content = 
            <div className={classes.gridContainer}>                
                {map}
                <div className={classes.gridItem}>
                    <DatePicker selectedDate={this.state.selectedDate} changeDateHandler={this.changeDateHandler}/>
                    <IconButton
                        onClick={this.refreshHandler}
                        color="primary"
                        style={{
                            position: "absolute",
                            top: "72px",
                            marginLeft: "9px"
                        }}
                    >
                        <RefreshOutlinedIcon
                            fontSize="large"
                        />
                    </IconButton>
                    <MuiThemeProvider>                   
                        {table}                
                    </MuiThemeProvider>
                    <div className={classes.submitDistributionButton}>
                        {submitButton}
                        <Snackbar open={this.state.openSnackbar} autoHideDuration={3000} onClose={this.closeSnackbarHandler}>
                            <Alert severity="success" onClose={this.loseSnackbarHandler}>
                                דיווח החלוקות בוצע בהצלחה
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
            </div>
        
        if (this.state.loading) {
            content =  
                <div className={classes.root}>
                    <CircularProgress size='250px' color="secondary" />
                </div>
        }

        return content;
    }
}

export default WorkArrangement;