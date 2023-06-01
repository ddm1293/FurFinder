/* Some codes in this file is chatGPT 4.0 generated */

import React from 'react';
import { useSelector } from 'react-redux';
import './Thread.css';

function Thread() {
    const user = useSelector((state) => state.user);
    const form = useSelector((state) => state.form);
    const thread = useSelector((state) => state.threads);

    return (
        <div className="thread-container">
            <div className="user-info">
                <img className="avatar" src={user.avatar} alt="user avatar" />
                <h2 className="username">{user.username}</h2>
            </div>
            <h3 className="thread-title">{thread.title}</h3>
            <div className="id-card">
                <img className="id-card-img" src={form.img} alt="form" />
                <div className="id-card-info">
                    <p data-label="Name: ">{form.name}</p>
                    <p data-label="ID: ">{form.ID}</p>
                    <p data-label="Breed: ">{form.breed}</p>
                    <p data-label="Sex: ">{form.sex}</p>
                    <p data-label="Last Seen Time: ">{form.lastSeenTime}</p>
                    <p data-label="Description: ">{form.description}</p>
                </div>
            </div>
            <p className="thread-text">{thread.text}</p>
        </div>
    );
}

export default Thread;
