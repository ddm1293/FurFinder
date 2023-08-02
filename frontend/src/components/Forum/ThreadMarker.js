import { useState, useRef} from 'react'
import { InfoWindow, Marker } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'
import missingCatMarker from '../../static/missingCatMarker.png'
import missingDogMarker from '../../static/missingDogMarker.png'
import PetCard from '../Thread/PetCard'

function ThreadMarker ({ thread }) {
  const navigate = useNavigate();
  const [displayPetCard, setDisplayPetCard] = useState(false);
  const closeTimeout = useRef(null); // Change this to useRef

  const processCoordinates = (coordinates) => {
    return {
      lat: coordinates[1],
      lng: coordinates[0]
    }
  }

  const openWindow = () => {
    setDisplayPetCard(true);
  }

  const closeWindow = () => {
    // Start a timeout to close the infowindow
    closeTimeout.current = setTimeout(() => {
      setDisplayPetCard(false);
    }, 300); // Delay of 300ms
  }

  const cencelClose = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
      setDisplayPetCard(true);
    }
  }

  const iconUrl = thread.pet.species === 'Cat' ? missingCatMarker : missingDogMarker;

  return (
    <div className='thread-marker-container' >
      <Marker
        key={thread._id}
        position={processCoordinates(thread.pet.lastSeenLocation.coordinates)}
        onClick={() => {
          navigate(`/threads/${thread._id}`)
        }}
        icon={{
          url: iconUrl,
          scaledSize: new window.google.maps.Size(32, 32),
        }}
        onMouseOver={openWindow}
        onMouseOut={closeWindow}
      >
        {
          displayPetCard &&
          <InfoWindow>
            <div className='pet-card-infoWindow'
                 onMouseOver={cencelClose}
                 onMouseOut={closeWindow}>
              <PetCard pet={thread.pet} />
            </div>
          </InfoWindow>
        }
      </Marker>
    </div>
  )
}

export default ThreadMarker

