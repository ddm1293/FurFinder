import { useState, useMemo, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import PlaceAutocomplete from './PlaceAutocomplete'

function Map (props) {
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEYS,
    language: 'en',
    libraries: ['places']
  })

  useEffect(() => {
    console.log('see selected: ', selected)
  }, [selected])

  const defaultCenter = useMemo(() => ({
    lat: 49.2827,
    lng: -123.1207
  }), []);

  if (!isLoaded) {
    return <div>
      Map Loading...
    </div>
  } else {
    return (
      <div className='map-container'>
        <div className='places-container'>
          <PlaceAutocomplete setSelected={setSelected} />
        </div>

        <GoogleMap
          zoom={10}
          center={selected || defaultCenter}
          mapContainerStyle={{ width: '400px', height: '300px' }}>
          {
            selected &&
            <Marker position={selected} />
          }
        </GoogleMap>
      </div>
    )
  }
}

export default Map
