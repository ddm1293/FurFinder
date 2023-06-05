import {useSelector} from 'react-redux';
import CommentInput from "./CommentInput"
import "../../style/Comments.css";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

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
                    <div className="comment-container" >
                        <div className="comment-info">
                            <Avatar icon={<UserOutlined/>}/>
                            <div className="comment-username">{comment.userName}</div>
                            <div className="comment-time">{comment.createdAt}</div>
                        </div>
                        <div className="comment-body">{comment.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentView;
