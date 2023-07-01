import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getThreadAsync, deleteThreadAsync } from '../thunk/threadThunk';
import '../style/Thread.css';
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';
import axios from 'axios';
import { format } from 'date-fns';

const { Meta } = Card;

function Thread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [poster, setPoster] = useState(null);
  const [pet, setPet] = useState(null);
  const user = useSelector((state) => state.user);
  console .log("user: ", user);

  useEffect(() => {
    dispatch(getThreadAsync(id)).then(({payload}) => {
      setThread(payload.thread);
    });
  }, [dispatch, id]);

  console.log("thread: ", thread);

  useEffect(() => {
    if (thread && thread.poster) {
      axiosPrivate({
        url: `http://localhost:3001/user/${thread.poster}`,
      }).then(response => {
          setPoster(response.data.user);
        })
        .catch(error => {
          console.error('Error fetching user data', error);
        });
    }
  }, [axiosPrivate, thread]);

  console.log("poster: ", poster);

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

  console.log("pet: ", pet);

  const handleDelete = () => {
    dispatch(deleteThreadAsync(id)).then(() => {
      navigate('/threads');
    });
  };

  const handleEdit = () => {
    // We'll implement this later.
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
        {user && user.id === poster._id && (
          <div className="button-wrapper">
            <Button className="edit-button" onClick={handleEdit}>Edit Thread</Button>
            <Button className="delete-button" onClick={handleDelete}>Delete Thread</Button>
          </div>
        )}
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
