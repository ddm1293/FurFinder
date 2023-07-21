import { useState } from 'react'
import { InfoWindow, Marker } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'
import missingCatMarker from '../../static/missingCatMarker.png'
import missingDogMarker from '../../static/missingDogMarker.png'
import PetCard from '../Thread/PetCard'

function ThreadMarker ({ thread }) {
  const navigate = useNavigate();
  const [displayPetCard, setDisplayPetCard] = useState(false);
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
    setDisplayPetCard(false);
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
      >
        {
          displayPetCard &&
          <InfoWindow
            onCloseClick={closeWindow}>
            <div className='pet-card-infoWindow'>
              <PetCard pet={thread.pet} />
            </div>
          </InfoWindow>
        }
      </Marker>
    </div>
  )
}

export default ThreadMarker
