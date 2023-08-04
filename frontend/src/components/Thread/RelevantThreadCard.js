import React from 'react';
import { format } from 'date-fns';
import '../../style/Thread/RelevantThreadCard.css'
import icon from "../../static/icon.png";

const RelevantThreadCard = ({ pet, src }) => (
  <div className="relevant-thread-card">
    <div className="relevant-thread-card-img-container">
      <img
        className="relevant-thread-card-img"
        alt="pet"
        src={src}
        onError={(e) => {e.target.onerror = null; e.target.src=icon}}
      />
    </div>
    <div className="relevant-thread-card-info">
      <h2 className="relevant-thread-card-title">{pet.name}</h2>
      <p><span className="relevant-thread-card-label">{pet.species === 'Cat' ? 'Cat Breed' : 'Dog Breed'}: </span>{pet.breed}</p>
      <p><span className="relevant-thread-card-label">Sex: </span>{pet.sex}</p>
      <p><span className="relevant-thread-card-label">Last Seen Time: </span>{format(new Date(pet.lastSeenTime), 'hh:mm aa, MMMM do yyyy')}</p>
      <p><span className="relevant-thread-card-label">Description: </span>{pet.description}</p>
    </div>
  </div>
);

export default RelevantThreadCard;
