import React, { Component } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import TextField from '@material-ui/core/TextField';

class MyAutoComplete extends Component {
    state = {
        address: null,
        lat: null,
        lng: null
    }

    handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        this.setState({
            address: value,
            lat: latLng.lat,
            lng: latLng.lng
        });
        
        this.props.onSelectAddress(this.state);
    };

    handleChange = address => {
        this.setState({ address });
    };

    render() {
        return (
            <div>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div style={{textAlign:'end'}}>
                        {/*<input style={{textAlign:'end'}} {...getInputProps({ placeholder: "חפש כתובת"})} />*/}
                        <TextField style={{width:'200px'}} {...getInputProps({ placeholder: "חפש כתובת"})} />
                        <div style={{
                            zIndex:'10',
                            position: 'absolute',
                            right: '0'}}
                        >
                        {loading ? <div>...מחפש</div> : null}

                        {suggestions.map(suggestion => {
                            const style = {
                                backgroundColor: suggestion.active ? "#A9A9A9" : "#fff",
                            };

                            return (
                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                    {suggestion.description}
                                </div>
                            );
                        })}
                        </div>
                    </div>
                    )}
                </PlacesAutocomplete>
            </div>
        );
    }
}

export default MyAutoComplete;