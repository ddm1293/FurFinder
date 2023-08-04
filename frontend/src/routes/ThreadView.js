import '../style/ThreadView.css';
import Thread from '../components/Thread/Thread';
import CommentView from "../components/Comments/CommentView";
import { useParams } from 'react-router-dom';
import RelevantThreads from '../components/Thread/RelevantThreads'
import React from 'react'

export default function ThreadView() {
  const { id } = useParams();

  return (
    <div id="thread-view">
      <Thread />
      <RelevantThreads threadID={id} />
      <CommentView threadID={id}/>
    </div>
  );
};
