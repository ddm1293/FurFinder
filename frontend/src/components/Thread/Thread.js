import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Buffer } from 'buffer'
import { Avatar, Button, Card } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteThreadAsync, getThreadAsync } from '../../thunk/threadThunk'
import '../../style/Thread/Thread.css'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import axios from 'axios'
import { format } from 'date-fns'
import UpdateThreadForm from '../UpdateThread/UpdateThreadForm'
import UserInfo from './UserInfo';
import ThreadTitle from './ThreadTitle';
import PetCard from './PetCard';
import ThreadContent from './ThreadContent';

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
  const [editModalVisible, setEditModalVisible] = useState(false);
  // console .log("user: ", user);

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

 // console.log("poster: ", poster);

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

  console.log("pet: ", pet);

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
    if (pet && pet.pic && pet.pic.length > 0) {
      const base64String = Buffer.from(pet.pic[0].data, 'binary').toString('base64');
      return `data:${pet.pic.contentType};base64,${base64String}`;
    }

    return null;
  }

  const {title, content} = thread;

  // return (
  //   <div className="thread-container">
  //     <div className="user-info">
  //       <Avatar size={64} src={poster.avatar} alt="user avatar" />
  //       <h2 className="thread-username">{poster.username}</h2>
  //       {user && user.id === poster._id && (
  //         <div className="button-wrapper">
  //           <Button className="edit-button" onClick={handleEdit}>Edit Thread</Button>
  //           <Button className="delete-button" onClick={handleDelete}>Delete Thread</Button>
  //         </div>
  //       )}
  //     </div>
  //     <div className="thread-title-container">
  //       <h3 className="thread-title">{title}</h3>
  //     </div>
  //     <Card
  //       className="id-card"
  //       cover={<img className="id-card-img" alt="pet" src={getPetPicUrl()} />}
  //     >
  //       <Meta
  //         title={<span className="id-card-title">Name: {pet.name}</span>}
  //         description={
  //           <div className="id-card-info">
  //             <p><span className="id-card-label">ID: </span>{pet.id}</p>
  //             {pet.species === 'Cat' ?
  //               <p><span className="id-card-label">Cat Breed: </span>{pet.breed}</p> :
  //               <p><span className="id-card-label">Dog Breed: </span>{pet.breed}</p>
  //             }
  //             <p><span className="id-card-label">Sex: </span>{pet.sex}</p>
  //             <p><span className="id-card-label">Last Seen Time: </span>{format(new Date(pet.lastSeenTime), 'hh:mm aa, MMMM do yyyy')}</p>
  //             <p><span className="id-card-label">Description: </span>{pet.description}</p>
  //           </div>
  //         }
  //       />
  //     </Card>
  //     <div className="thread-text-container">
  //       <p className="thread-text">{content}</p>
  //     </div>
  //     <UpdateThreadForm open={editModalVisible}
  //                       onUpdate={handleUpdate}
  //                       onCancel={handleCancel}
  //                       threadId={id}
  //     />
  //   </div>
  // );

  return (
    <div className="thread-container">
      <UserInfo poster={poster} user={user} handleEdit={handleEdit} handleDelete={handleDelete} />
      <ThreadTitle title={title} />
      <PetCard pet={pet} getPetPicUrl={getPetPicUrl} />
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