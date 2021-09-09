import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { googleMapsApiKey, locationiqKey } from '../../shared/codes';
import Geocode from 'react-geocode';
import Table from  '../Tables/TrackTable/TrackTable';
import DatePicker from '../DatePicker/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { redMarker , greenMarker } from '../../shared/svg/svgMarkers';
import axios from 'axios';
import { getCenter } from '../../shared/functions';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';

const styles = theme => ({
    gridContainer: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridColumnGap: '5px',
        gridTemplateColumns: '1fr 1.2fr'
    },
    gridItem: {
        height: '90vh'
    },
    card: {
        width: '400px',
        textAlign: 'center',
        margin: 'auto',
        marginTop: '40px',
        fontSize: '20px',
        backgroundColor: 'powderblue'
    },
    root: {
        textAlign: 'center',
        padding: '100px'
    },
    
    noMap: {
        backgroundColor: '#e7f2f5'
    },
    
    noMapLabel: {
        textAlign: 'center',
        marginBlock: '250px',
        fontWeight: 'bold',
        fontSize: 'larger'
    }
});

Geocode.setApiKey(googleMapsApiKey);

class TrackDistribution extends Component {

    state = {  
        selectedDate: new Date(),
        data: [],
        editIdx: -1,
        loading: false
    }

    async componentDidMount () {
        this.setState({loading: true});
        await axios.post("/distributions/getAllDistributions", {date: new Date().toLocaleDateString()})
        .then(res => {
            console.log(res.data)
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

    refreshHandler = () => {
        this.changeDateHandler(this.state.selectedDate)
    }

    //datePicker function
    changeDateHandler = async (newDate) => {
        //this.setState({selectedDate: newDate});
        this.setState({
            selectedDate: newDate,
            loading: true
        });
        await axios.post("/distributions/getAllDistributions",  {date: newDate.toLocaleDateString()})
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

    googleMapURL = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsApiKey + "&v=3.exp&libraries=geometry,drawing,places";

    render() {

        const { classes } = this.props;

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={14}
              defaultCenter={{ lat: 31.820637792650984, lng: 35.24921573570617 }}            
              center={getCenter(this.state.data)}
            >
                {
                this.state.data
                .map(row =>(
                        <Marker
                        animation={window.google.maps.Animation.DROP}
                        position={{ lat: eval(row.lat), lng: eval(row.lng) }}
                        icon={row.isDone ? greenMarker : redMarker }                            
                    />
                ))}
            </GoogleMap>           
        ));
        
        let table = (
            <Table
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
                },
                {
                    name: "בוצע",
                    prop: "isDone"
                }
                ]}
            />        
        )

        if (this.state.data.length == 0) {
            table = <Card className={classes.card}>
                <CardContent>
                    לא מוגדרות חלוקות ביום זה   
                </CardContent>
            </Card>;
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

TrackDistribution.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(TrackDistribution);