import React, { useMemo, useEffect } from 'react'
import { useLoadScript, GoogleMap } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataPointsAsync } from '../../thunk/mapViewThunk'
import _ from 'lodash'
import ThreadMarker from '../Forum/ThreadMarker'

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

  const renderMarkers = () => {
    if (dataPoints && dataPoints.length !== 0) {
      const validPoints = _.filter(dataPoints, (dataPoint) =>
        _.isObject(dataPoint.pet.lastSeenLocation));
      return validPoints.map(point => {
        return <ThreadMarker thread={point} />
      });
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
