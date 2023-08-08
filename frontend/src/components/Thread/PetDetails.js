import React from 'react';
import dayjs from 'dayjs';

const PetDetails = ({ pet }) => {
  const dominantColorStyle = {
    backgroundColor: `rgb(${pet.color.dominantColor.r}, ${pet.color.dominantColor.g}, ${pet.color.dominantColor.b})`,
    width: '15px',
    height: '15px',
    display: 'inline-block',
    marginLeft: '5px',
  };

  const sizeCategoryMap = ['Small', 'Medium', 'Large'];
  const sizeCategory = sizeCategoryMap[pet.sizeCategory] || 'Unknown';

  return (
    <>
      <p>
        <span className="pet-details-label" style={{ fontWeight: 'bold' }}>{pet.species === 'Cat' ? 'Cat Breed' : 'Dog Breed'}: </span>
        {pet.breed}, main color
        <span style={dominantColorStyle}></span>
      </p>
      <p><span className="pet-details-label" style={{ fontWeight: 'bold' }}>Sex: </span>{pet.sex}</p>
      <p>
        <span className="pet-details-label" style={{ fontWeight: 'bold' }}>Size: </span>
        {sizeCategory}
        {pet.sizeNumber && ` (about ${pet.sizeNumber} inches)`}
      </p>
      <p><span className="pet-details-label" style={{ fontWeight: 'bold' }}>Last Seen Time: </span>{dayjs(pet.lastSeenTime).format('hh:mm A, MMMM Do YYYY')}</p>
      <p><span className="pet-details-label" style={{ fontWeight: 'bold' }}>Description: </span>{pet.description}</p>
    </>
  );
};

export default PetDetails;
