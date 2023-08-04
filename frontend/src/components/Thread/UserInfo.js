import { Button } from 'antd';
import React from 'react';
import '../../style/Thread/UserInfo.css'
import DisplayAvatar from '../User/DisplayAvatar';

const UserInfo = ({ poster, user, handleEdit, handleDelete }) => (
  <div className="user-info">
    <DisplayAvatar currentUser={poster._id} size={64} />
    <h2 className="thread-username">{poster.username}</h2>
    {user && user.id === poster._id && (
      <div className="button-wrapper">
        <Button className="edit-button" onClick={handleEdit}>Edit Thread</Button>
        <Button className="delete-button" onClick={handleDelete}>Delete Thread</Button>
      </div>
    )}
  </div>
);

export default UserInfo;
