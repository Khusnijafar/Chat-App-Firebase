import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import  * as locationData from './location.json'

function Map() {
    return (
    <GoogleMap 
        defaultZoom={10} 
        defaultCenter={{ lat: -7.757965, lng: 110.377190 }}
    >
        {locationData.features.map((park) => (
            <Marker key={park.properties.PARK_ID} 
            position={{lat: park.geometry.coordinates[1],
                       lng: park.geometry.coordinates[0]
                      }}
            />
        ))}
    </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function Peta() {
    console.log(process.env.REACT_APP_GOOGLE_KEY);
    
    return (
        <div style={{ width: '100vw', height: '100vh'}}>
            <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBqy41HDhB76rXy3rgUsDOI2eOFgLDimzQ`}
                loadingElement={<div style={{height: '100%'}}/>}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />} />
        </div>
    )
}
