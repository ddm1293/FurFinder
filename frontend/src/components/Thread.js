import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import '../style/Thread.css';

const { Meta } = Card;

function Thread() {
    const user = useSelector((state) => state.user);
    const form = useSelector((state) => state.form);
    const thread = useSelector((state) => state.threads);

    return (
        <div className="thread-container">
            <div className="user-info">
                <Avatar size={64} src={user.avatar} alt="user avatar" />
                <h2 className="username">{user.username}</h2>
            </div>
            <div className="thread-title-container">
                <h3 className="thread-title">{thread.title}</h3>
            </div>
            <Card
                className="id-card"
                cover={<img className="id-card-img" alt="form" src={form.img} />}
            >
                <Meta
                    title={<span className="id-card-title">Name: {form.name}</span>}
                    description={
                        <div className="id-card-info">
                            <p>ID: {form.ID}</p>
                            <p>Breed: {form.breed}</p>
                            <p>Sex: {form.sex}</p>
                            <p>Last Seen Time: {form.lastSeenTime}</p>
                            <p>Description: {form.description}</p>
                        </div>
                    }
                />
            </Card>
            <div className="thread-text-container">
                <p className="thread-text">{thread.text}</p>
            </div>
        </div>
    );
}

export default Thread;