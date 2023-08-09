import { Card, Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/Thread/PetCard.css';
import icon from "../../static/icon.png";
import { getApiUrl } from '../../utils/getApiUrl'
import PetDetails from './PetDetails'

const { Meta } = Card;

const PetCard = ({ pet }) => {
  const [petPics, setPetPics] = useState([]);
  const [isMultiple, setIsMultiple] = useState(false);

  const fetchPetPics = async () => {
    const response = await axios.get(getApiUrl(`/pet/${pet._id}/image`));
    if (Array.isArray(response.data) && response.data.length > 1) {
      setIsMultiple(true);
      setPetPics(response.data.map((pic, i) => `data:${pic.contentType};base64,${pic.data}`));
    } else {
      setIsMultiple(false);
      setPetPics([getApiUrl(`/pet/${pet._id}/coverImage`)]);
    }
  };

  useEffect(() => {
    fetchPetPics();
  }, [pet]);

  return (
    <Card className="id-card">
      {isMultiple ? (
        <Carousel className='pet-card-carousel' autoplay dotPosition='top'>
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
            <PetDetails pet={pet} />
          </div>
        }
      />
    </Card>
  );
}

export default PetCard;
