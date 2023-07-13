import '../style/ThreadView.css';
import Thread from '../components/Thread/Thread';
import CommentView from "../components/Comments/CommentView";
import { useParams } from 'react-router-dom';

export default function ThreadView() {
  const { id } = useParams();

  return (
    <div id="thread-view">
      <Thread />
      <CommentView threadID={id}/>
    </div>
  );
};
