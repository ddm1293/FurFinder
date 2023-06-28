import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Buffer } from 'buffer';
import { Avatar, Card, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getThreadAsync, deleteThreadAsync } from '../thunk/threadThunk';
import '../style/Thread.css';
import axios from 'axios';
import { format } from 'date-fns';

const { Meta } = Card;

function Thread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const thread = useSelector((state) => {
    return state.threads.threadList.find(t => t._id === id);
  });
  const poster = useSelector(state => state.user);
  const [pet, setPet] = useState(null);

  function getPetPicUrl() {
    console.log(pet);

    if (pet && pet.pic) {
      const base64String = Buffer.from(pet.pic[0].data, 'binary').toString('base64');
      const imageUrl = `data:${pet.pic.contentType};base64,${base64String}`;
      return imageUrl;
    }

    return null;
  }

  useEffect(() => {
    if (!thread) {
      dispatch(getThreadAsync(id));
    }
  }, [dispatch, id, thread]);

  useEffect(() => {
    if (thread && thread.pet) {
      axios.get(`http://localhost:3001/pet/${thread.pet}`)
        .then(response => {
          setPet(response.data.pet);
        })
        .catch(error => {
          console.error('Error fetching pet data', error);
        });
    }
  }, [thread]);

  useEffect(() => {
  }, [pet]);

  const handleDelete = () => {
    dispatch(deleteThreadAsync(id)).then(() => {
      navigate('/threads');
    });
  };

  if (!thread || !poster || !pet) {
    return 'Loading...';
  }

  const {title, content} = thread;

  return (
    <div className="thread-container">
      <div className="user-info">
        <Avatar size={64} src={poster.avatar} alt="user avatar" />
        <h2 className="thread-username">{poster.username}</h2>
        <Button className="delete-button" onClick={handleDelete}>Delete Thread</Button>
      </div>
      <div className="thread-title-container">
        <h3 className="thread-title">{title}</h3>
      </div>
      <Card
        className="id-card"
        cover={<img className="id-card-img" alt="pet" src={getPetPicUrl()} />}
      >
        <Meta
          title={<span className="id-card-title">Name: {pet.name}</span>}
          description={
            <div className="id-card-info">
              <p><span className="id-card-label">ID: </span>{pet.id}</p>
              {pet.species === 'cat' ?
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
      <div className="thread-text-container">
        <p className="thread-text">{content}</p>
      </div>
    </div>
  );
}
export default Thread;
