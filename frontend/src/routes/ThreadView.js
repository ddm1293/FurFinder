import '../style/ThreadView.css';
import Thread from '../components/Thread';
import CommentView from "../components/Comments/CommentView";

export default function ThreadView() {
  return (
    <div id="thread-view">
      <Thread />
      <CommentView />
    </div>
  );
};
