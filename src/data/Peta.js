import React, { Component } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'

function Map() {
    return (
    <GoogleMap 
        defaultZoom={10} 
        defaultCenter={{ lat: -7.757965, lng: 110.377190 }}
    />
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function Peta() {
    return (
        <div>
            <WrappedMap 
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'}
                loadingElement={<div style={{height: '100%'}}/>}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />} />
        </div>
    )
}
