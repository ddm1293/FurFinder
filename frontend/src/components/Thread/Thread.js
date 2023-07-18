import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteThreadAsync, getThreadAsync } from '../../thunk/threadThunk';
import '../../style/Thread/Thread.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import axios from 'axios';
import UpdateThreadForm from '../UpdateThread/UpdateThreadForm';
import UserInfo from './UserInfo';
import ThreadTitle from './ThreadTitle';
import PetCard from './PetCard';
import ThreadContent from './ThreadContent';
import ThreadMap from './ThreadMap'

function Thread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [poster, setPoster] = useState(null);
  const [pet, setPet] = useState(null);
  const user = useSelector((state) => state.user);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getThreadAsync(id)).then(({payload}) => {
      setThread(payload.thread);
    });
  }, [dispatch, id]);

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

  useEffect(() => {
    if (thread && thread.pet) {
      axios.get(`http://localhost:3001/pet/${thread.pet}`)
        .then(response => {
          // console.log("response data: ", response);
          setPet(response.data);
        })
        .catch(error => {
          console.error('Error fetching pet data', error);
        });
    }
  }, [thread]);

  const handleDelete = () => {
    dispatch(deleteThreadAsync(id)).then(() => {
      navigate('/threads');
    });
  };

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleUpdate = () => {
    setEditModalVisible(false);
  };

  const handleCancel = () => {
    setEditModalVisible(false);
  };

  if (!thread || !poster || !pet) {
    return 'Loading...';
  }

  function getPetPicUrl() {
    if (pet) {
      return `http://localhost:3001/pet/${pet._id}/image`;
    }
  }

  const {title, content} = thread;

  return (
    <div className="thread-container">
      <UserInfo poster={poster} user={user} handleEdit={handleEdit} handleDelete={handleDelete} />
      <ThreadTitle title={title} />

      <div className="pet-info-container">
        <div className="pet-card-container">
          <PetCard pet={pet} src={getPetPicUrl()} />
        </div>
        {pet && pet.lastSeenLocation && (
          <div className="thread-map-container">
            <ThreadMap
              lastSeenLocation={{lat: pet.lastSeenLocation.coordinates[1], lng: pet.lastSeenLocation.coordinates[0]}}
              species={pet.species}
            />
          </div>
        )}
      </div>


      <ThreadContent content={content} />
      <UpdateThreadForm open={editModalVisible}
                        onUpdate={handleUpdate}
                        onCancel={handleCancel}
                        threadId={id}
      />
    </div>
  );
}
export default Thread;
