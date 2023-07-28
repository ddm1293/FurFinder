import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, Circle, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
import '../../style/Thread/ThreadMap.css';

function ThreadMap({ lastSeenLocation, species, relevant }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEYS,
    language: 'en',
    libraries: ['places']
  });

  const mapContainerRef = useRef(null);
  const [relevantLocations, setRelevantLocations] = useState([]);

  useEffect(() => {
    const fetchRelevantLocations = async () => {
      const threads = await Promise.all(relevant.map(id => axios.get(`http://localhost:3001/thread/${id}`)));
      const petsData = await Promise.all(threads.map(relevantThread =>
        axios.get(`http://localhost:3001/pet/${relevantThread.data.thread.pet}`)));
      const locations = petsData.map((pet, index) => ({
        lat: pet.data.lastSeenLocation.coordinates[1],
        lng: pet.data.lastSeenLocation.coordinates[0],
        threadId: threads[index].data.thread._id // add thread id to the location object
      }));
      setRelevantLocations(locations);
    };
    fetchRelevantLocations();
  }, [relevant]);

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
          {relevantLocations.map((location, index) => (
            <Marker
              key={index}
              position={location}
              onClick={() => window.open(`/threads/${location.threadId}`, "_blank")}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new window.google.maps.Size(42, 42),
              }}
            />
          ))}
        </GoogleMap>
      </div>
    );
  }
}

export default ThreadMap;

