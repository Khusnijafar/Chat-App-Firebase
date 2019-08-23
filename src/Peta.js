import React, { Component } from 'react';
import { Marker, GoogleApiWrapper, InfoWindow, Map } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}  
    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
    
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        // style={style}
        initialCenter={{ lat: -7.757608, lng: 110.377143 }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Arkademy Jogja Camp'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqy41HDhB76rXy3rgUsDOI2eOFgLDimzQ'
})(MapContainer);