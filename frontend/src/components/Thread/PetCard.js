import { Card } from 'antd';
import React from 'react';
import { format } from 'date-fns';
import '../../style/Thread/PetCard.css'

const { Meta } = Card;

const PetCard = ({ pet, src }) => (
  <Card
    className="id-card"
    cover={<img className="id-card-img" alt="pet" src={src} />}
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
          <p><span className="id-card-label">Last Seen Time: </span>{format(new Date(pet.lastSeenTime), 'hh:mm aa, MMMM do yyyy')}</p>
          <p><span className="id-card-label">Description: </span>{pet.description}</p>
        </div>
      }
    />
  </Card>
);

export default PetCard;
