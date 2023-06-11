import {useSelector} from 'react-redux';
import "../../style/Comments.css";
import CommentInput from "./CommentInput";
import Comment from './Comment';

function CommentView() {
    const comments = useSelector((state) => state.comments);

    return (
        <div className="comment-main">
            <h3>Comments</h3>
            <div className="comment-add">
                <div><CommentInput/></div>
            </div>
            <div className="comment-list">
                {comments.map((comment) => (
                    <Comment comment={comment} />
                ))}
            </div>
        </div>
    );
}

export default CommentView;
