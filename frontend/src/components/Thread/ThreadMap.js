import React, { useEffect, useRef } from 'react';
import { GoogleMap, Marker, Circle, useLoadScript } from '@react-google-maps/api';
import '../../style/Thread/ThreadMap.css';

function ThreadMap({ lastSeenLocation, species }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEYS,
    language: 'en',
    libraries: ['places']
  });

  const mapContainerRef = useRef(null);

  const handleResize = () => {
    if (mapContainerRef.current) {
      mapContainerRef.current.style.width = '100%';
      if (window.innerWidth > 1024) {
        // For larger screens, maintain a 7:9 aspect ratio
        mapContainerRef.current.style.height =
          `${0.7 * mapContainerRef.current.clientWidth}px`;
      } else {
        // For smaller screens, use a fixed height
        mapContainerRef.current.style.height = '300px';
        mapContainerRef.current.style.width = '450px';
      }
    }
  };



  useEffect(() => {
    // set initial size
    setTimeout(handleResize, 0);

    // update size on window resize
    window.addEventListener('resize', handleResize);

    // cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isLoaded) {
    return <div>Map Loading...</div>
  } else {
    // Call handleResize function after Google Map library has loaded
    setTimeout(handleResize, 0);
    return (
      <div ref={mapContainerRef} className="ThreadMap">
        <GoogleMap
          zoom={14}
          center={lastSeenLocation}
          mapContainerStyle={{ width: '100%', height: '100%'}}
        >
          <Marker position={lastSeenLocation} />
          {species === 'Cat' && <Circle center={lastSeenLocation} radius={500} />}
        </GoogleMap>
      </div>
    );
  }
}

export default ThreadMap;

