import { useState, useMemo, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api'
import PlaceAutocomplete from './PlaceAutocomplete'
import { Typography } from 'antd'

function Map ({ handleMapInfo, initialPosition }) {
  const [selected, setSelected] = useState(null);
  const [searched, setSearched] = useState(null);
  const [pinned, setPinned] = useState(null);
  const [searchText, setSearchText] = useState('');

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEYS,
    language: 'en',
    libraries: ['places']
  })

  const defaultCenter = useMemo(() => ({
    lat: 49.2827,
    lng: -123.1207
  }), []);

  useEffect(() => {
    if (initialPosition) {
      setPinned(initialPosition);
    }
  }, [initialPosition]);


  useEffect(() => {
    setSelected(pinned);
    setSearchText('');
  }, [pinned]);

  useEffect(() => {
    setSelected(searched);
  }, [searched])

  useEffect(() => {
    console.log('see selected: ', selected)
    handleMapInfo(selected);
  }, [selected])

  const setPin = (e) => {
    let latLng;
    if (e.latLng) {
      // Event object from Google Maps API
      latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    } else {
      // Presumably, a plain object from initialPosition
      latLng = e;
    }
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
          <PlaceAutocomplete
            setSearched={setSearched}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>

        <GoogleMap
          zoom={10}
          center={selected || defaultCenter}
          mapContainerStyle={{ width: '400px', height: '300px' }}
          onRightClick={setPin}
        >
          {
            !selected &&
            <InfoWindow position={defaultCenter}>
              <div className='map-infoWindow'>
                <Typography.Text>Search above or Right click to pin the last seen location</Typography.Text>
              </div>
            </InfoWindow>
          }
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
