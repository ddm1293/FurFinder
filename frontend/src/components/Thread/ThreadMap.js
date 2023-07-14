import React from 'react'
import { GoogleMap, Marker, Circle, useLoadScript } from '@react-google-maps/api'
import '../../style/Thread/ThreadMap.css'

function ThreadMap ({ lastSeenLocation, species }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEYS,
    language: 'en',
    libraries: ['places']
  })

  if (!isLoaded) {
    return <div>Map Loading...</div>
  }

  return (
    <GoogleMap
      mapContainerClassName='ThreadMap'
      zoom={14}
      center={lastSeenLocation}
      mapContainerStyle={{ width: '55%', height: '60vh'}}
    >
      <Marker position={lastSeenLocation} />
      {species === 'Cat' && <Circle center={lastSeenLocation} radius={500} />}
    </GoogleMap>
  )
}

export default ThreadMap
