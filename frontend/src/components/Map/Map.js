import { useState, useMemo, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import PlaceAutocomplete from './PlaceAutocomplete'

function Map ({ handleMapInfo }) {
  const [selected, setSelected] = useState(null);
  const [searched, setSearched] = useState(null);
  const [pinned, setPinned] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEYS,
    language: 'en',
    libraries: ['places']
  })

  useEffect(() => {
    if (pinned) {
      setSelected(pinned);
      setSearched(null);
    }
  }, [pinned]);

  useEffect(() => {
    if (searched) {
      setSelected(searched);
      setPinned(null);
    }
  }, [searched])

  useEffect(() => {
    console.log('see pinned, searched, selected: ', pinned, searched, selected)
    handleMapInfo(selected);
  }, [selected])

  const defaultCenter = useMemo(() => ({
    lat: 49.2827,
    lng: -123.1207
  }), []);

  const setPin = (e) => {
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setPinned(latLng);
  }

  if (!isLoaded) {
    return <div>
      Map Loading...
    </div>
  } else {
    return (
      <div className='map-container'>
        <div className='places-container'>
          <PlaceAutocomplete searched={searched} setSearched={setSearched} />
        </div>

        <GoogleMap
          zoom={10}
          center={selected || defaultCenter}
          mapContainerStyle={{ width: '400px', height: '300px' }}
          onRightClick={setPin}
        >
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
