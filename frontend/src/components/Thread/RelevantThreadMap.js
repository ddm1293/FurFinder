import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';

function RelevantThreadMap({ lastSeenLocation }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEYS,
    language: 'en',
    libraries: ['places']
  });

  if (!isLoaded) {
    return <div>Map Loading...</div>
  } else {
    return (
      <div style={{width: '150px', height: '150px'}}>
        <GoogleMap
          zoom={14}
          center={lastSeenLocation}
          mapContainerStyle={{ width: '100%', height: '100%'}}
        >
          <Marker position={lastSeenLocation} />
        </GoogleMap>
      </div>
    );
  }
}

export default RelevantThreadMap;
