import React from 'react';
import '../../style/Thread/ThreadTitle.css'

const ThreadTitle = ({ title }) => (
  <div className="thread-title-container">
    <h3 className="thread-title">{title}</h3>
  </div>
);

export default ThreadTitle;
