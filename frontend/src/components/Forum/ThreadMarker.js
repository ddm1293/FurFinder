import { useState } from 'react'
import { InfoWindow, Marker } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'
import missingCatMarker from '../../static/missingCatMarker.png'
import missingDogMarker from '../../static/missingDogMarker.png'
import PetCard from '../Thread/PetCard'
import '../../style/Forum/MapView.css';

function ThreadMarker ({ thread }) {
  const navigate = useNavigate();

  const [shouldDisplayCard, setShouldDisplayCard] = useState(false);
  const [cardIsSelected, setCardIsSelected] = useState(false);

  const iconUrl = thread.pet.species === 'Cat' ? missingCatMarker : missingDogMarker;

  function processCoordinates(coordinates) {
    return {
      lat: coordinates[1],
      lng: coordinates[0]
    };
  }
  function onMouseOver() {
    setShouldDisplayCard(true);
  }
  function onClick() {
    setCardIsSelected(true);
  }
  function onMouseOut() {
    if (!cardIsSelected) {
      setTimeout(() => {
        setShouldDisplayCard(false);
      }, 30);
    }
  }
  function closeWindow() {
    setShouldDisplayCard(false);
    setCardIsSelected(false);
  }

  return (
    <div className='thread-marker-container' >
      <Marker
        key={thread._id}
        position={processCoordinates(thread.pet.lastSeenLocation.coordinates)}
        icon={{
          url: iconUrl,
          scaledSize: new window.google.maps.Size(32, 32),
        }}
        onMouseOver={onMouseOver}
        onClick={onClick}
        onMouseOut={onMouseOut}
      >
        {
          shouldDisplayCard &&
          <InfoWindow
            onCloseClick={closeWindow}>
            <div className='pet-card-infoWindow' onClick={() => { navigate(`/threads/${thread._id}`); }}>
              <PetCard pet={thread.pet} />
            </div>
          </InfoWindow>
        }
      </Marker>
    </div>
  )
}

export default ThreadMarker
