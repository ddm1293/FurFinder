import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, Circle, InfoWindow, useLoadScript} from '@react-google-maps/api';
import axios from 'axios';
import ThreadMarker from '../Forum/ThreadMarker';
import '../../style/Thread/ThreadMap.css';

function ThreadMap({ lastSeenLocation, species, relevant }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEYS,
    language: 'en',
    libraries: ['places']
  });

  const mapContainerRef = useRef(null);
  const [relevantThreads, setRelevantThreads] = useState([]);

  useEffect(() => {
    const fetchRelevantThreads = async () => {
      const threads = await Promise.all(relevant.map(id => axios.get(`http://localhost:3001/thread/${id}`)));
      const petPromises = threads.map((thread) => axios.get(`http://localhost:3001/pet/${thread.data.thread.pet}`));
      const petResponses = await Promise.all(petPromises);
      const pets = petResponses.map((res) => res.data);
      const threadsWithPets = threads.map((thread, index) => ({
        ...thread.data.thread,
        pet: pets[index]
      }));
      setRelevantThreads(threadsWithPets);
    };
    fetchRelevantThreads();
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
          {species === 'Cat' && <InfoWindow position={lastSeenLocation}>
            <div>
              <p>75% of cats were found within 500m of the point of escape</p>
            </div>
          </InfoWindow>}
          {relevantThreads.map((thread, index) => (
            <ThreadMarker
              key={index}
              thread={thread}
            />
          ))}
        </GoogleMap>
      </div>
    );
  }
}

export default ThreadMap;

