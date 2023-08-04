import { Card, Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import '../../style/Thread/PetCard.css';
import icon from "../../static/icon.png";

const { Meta } = Card;

const PetCard = ({ pet }) => {
  const [petPics, setPetPics] = useState([]);
  const [isMultiple, setIsMultiple] = useState(false);

  const fetchPetPics = async () => {
    const response = await axios.get(`/pet/${pet._id}/image`);
    if (Array.isArray(response.data)) {
      setIsMultiple(true);
      setPetPics(response.data.map((pic, i) => `data:${pic.contentType};base64,${pic.data}`));
    } else {
      setIsMultiple(false);
      setPetPics([`/pet/${pet._id}/image`]);
    }
  };

  useEffect(() => {
    fetchPetPics();
  }, [pet]);

  return (
    <Card className="id-card">
      {isMultiple ? (
        <Carousel autoplay dotPosition='top'>
          {petPics.map((src, index) => (
            <img
              key={index}
              className="id-card-img"
              alt="pet"
              src={src}
              onError={(e) => {e.target.onerror = null; e.target.src=icon}}
            />
          ))}
        </Carousel>
      ) : (
        <img
          className="id-card-img"
          alt="pet"
          src={petPics[0]}
          onError={(e) => {e.target.onerror = null; e.target.src=icon}}
        />
      )}
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
}

export default PetCard;
