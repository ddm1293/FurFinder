import React, { useMemo, useEffect } from 'react'
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataPointsAsync } from '../../thunk/mapViewThunk'
import _ from 'lodash'

function MapView (props) {
  const dispatch = useDispatch();
  const dataPoints = useSelector((state) => state.mapView.dataPoints);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEYS,
    language: 'en',
    libraries: ['places']
  })

  useEffect(() => {
    dispatch(fetchDataPointsAsync());
  }, [])

  const processCoordinates = (coordinates) => {
    return {
      lat: coordinates[1],
      lng: coordinates[0]
    }
  }

  const renderMarkers = () => {
    if (dataPoints && dataPoints.length !== 0) {
      const validPoints = _.filter(dataPoints, (dataPoint) =>
        _.isObject(dataPoint.pet.lastSeenLocation));
      return validPoints.map(point => (
        <Marker key={point._id}
                position={ processCoordinates(point.pet.lastSeenLocation.coordinates) }/>
      ));
    }
  }

  const defaultCenter = useMemo(() => ({
    lat: 49.2517,
    lng: -123.0507
  }), []);

  if (!isLoaded || !dataPoints) {
    return <div>
      Map Loading...
    </div>
  } else {
    return <div className='map-view-container'>
      <div
        className='map-container'
        style={{ width: '100vw', height: '100vh' }}
      >
        <GoogleMap
          zoom={11}
          center={defaultCenter}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
          { renderMarkers() }
        </GoogleMap>
      </div>
    </div>
  }
}

export default MapView
