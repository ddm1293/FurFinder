import React from 'react';
import '../../style/Thread/RelevantThreadCard.css'
import icon from "../../static/icon.png";
import PetDetails from './PetDetails'

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
      <PetDetails pet={pet} />
    </div>
  </div>
);

export default RelevantThreadCard;
