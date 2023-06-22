import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Card, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getThreadAsync, deleteThreadAsync } from '../thunk/threadThunk';
import '../style/Thread.css';
import axios from 'axios';

const { Meta } = Card;

function Thread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // get thread ID from URL
  //console.log(id);
  // const state = useSelector((state) => state);
  //console.log(state);
  const thread = useSelector((state) => state.threads.threadList.find(t => t._id === id));
  const [poster, setPoster] = useState(null);
  const [pet, setPet] = useState(null);

  useEffect(() => {
    if (!thread) {
      dispatch(getThreadAsync(id));
    }
  }, [dispatch, id, thread]);
  // console.log('thread: ', thread);

  // TODO: to use dispatch for this
  useEffect(() => {
    if (thread && thread.poster) {
      axios.get(`http://localhost:3001/user/${thread.poster}`)
        .then(response => {
          setPoster(response.data.user);
          //console.log('poster: ', response.data.user);
        })
        .catch(error => {
          console.error('Error fetching poster data', error);
        });
    }
  }, [thread]);

  // TODO: not so sure about this one, I think maybe remain this way
  useEffect(() => {
    if (thread && thread.pet) {
      axios.get(`http://localhost:3001/pet/${thread.pet}`)
        .then(response => {
          setPet(response.data.pet);
          //console.log('pet: ', response.data.pet);
        })
        .catch(error => {
          console.error('Error fetching pet data', error);
        });
    }
  }, [thread]);

  const handleDelete = () => {
    dispatch(deleteThreadAsync(id)).then(() => {
      // redirect user to another page after thread is deleted
      navigate('/threads');
    });
  };

  if (!thread || !poster || !pet) {
    return 'Loading...';
  }


  const { title, content} = thread;

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
        cover={<img className="id-card-img" alt="pet" src={pet.pic} />}
      >
        <Meta
          title={<span className="id-card-title">Name: {pet.name}</span>}
          description={
            <div className="id-card-info">
              <p>ID: {pet.ID}</p>
              <p>Breed: {pet.breed}</p>
              <p>Sex: {pet.sex}</p>
              <p>Last Seen Time: {pet.lastSeenTime}</p>
              <p>Description: {pet.description}</p>
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
