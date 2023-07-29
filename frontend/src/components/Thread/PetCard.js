import { Card } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import '../../style/Thread/PetCard.css'

dayjs.extend(advancedFormat);

const { Meta } = Card;

const PetCard = ({ pet }) => {
  const getPetPicUrl = () => {
    if (pet) {
      return `https://furfinder-server.onrender.com/pet/${pet._id}/image`;
    }
  }
  return (
    <Card
      className="id-card"
      cover={<img className="id-card-img" alt="pet" src={getPetPicUrl()} />}
    >
      <Meta
        title={<span className="id-card-title">Name: {pet.name}</span>}
        description={
          <div className="id-card-info">
            {pet.species === 'Cat' ?
              <p><span className="id-card-label">Cat Breed: </span>{pet.breed}</p> :
              <p><span className="id-card-label">Dog Breed: </span>{pet.breed}</p>
            }
            <p><span className="id-card-label">Sex: </span>{pet.sex}</p>
            <p><span className="id-card-label">Last Seen Time: </span>{dayjs(pet.lastSeenTime).format('hh:mm A, MMMM Do YYYY')}</p>
            <p><span className="id-card-label">Description: </span>{pet.description}</p>
          </div>
        }
      />
    </Card>
  );
}

export default PetCard;
