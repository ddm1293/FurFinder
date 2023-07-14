import React from 'react';
import '../../style/Thread/ThreadContent.css'

const ThreadContent = ({ content }) => (
  <div className="thread-text-container">
    <p className="thread-text">{content}</p>
  </div>
);

export default ThreadContent;
