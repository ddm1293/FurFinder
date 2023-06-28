import { Avatar } from 'antd'
import { DeleteOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { deleteCommentAsync } from '../../thunk/commentThunk'
import { useDispatch } from 'react-redux'
import CommentInput from './CommentInput'

function Comment (props) {
  const [userName, setUserName] = useState('')
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const isLogin = props.userID !== null;
  const isAuthor = props.userID === props.comment.author.id;
  const [reply, setReply] = useState('');
  const isReply = reply && (reply._id === props.comment._id); // where to render comment form

  useEffect(() => {
    axiosPrivate({
      url: `http://localhost:3001/user/${props.comment.author.id}`,
    }).then((response) => {
      setUserName(response.data.user.username)
    }).catch((error) => {
      console.error(error)
    });
  }, [props.comment.author])

  return (
    <div className="comment-container">
      <div className="comment-info">
        <Avatar icon={<UserOutlined />} />
        <div className="comment-username">{userName}</div>
        <div className="comment-time">{props.comment.date}</div>
      </div>
      <div className="comment-body">{props.comment.content}</div>
      <div className="comment-actions">
        <div className="comment-buttons">
          {isAuthor && (
            <div onClick={() => { dispatch(deleteCommentAsync(props.comment))}}
                 style={{ marginRight: '10px', cursor: 'pointer', fontSize: '10pt'}}>
              <DeleteOutlined /> Delete
            </div>)
          }
          {isLogin && (
            <div onClick={() => {setReply(props.comment)}}
                 style={{ marginRight: '10px', cursor: 'pointer', fontSize: '10pt'}}>
              <MessageOutlined /> Reply
            </div>)
          }
        </div>
        {isReply && (
          <CommentInput threadID={props.threadID} parentID={reply._id}
                        handleSubmit={() => setReply("")}/>
        )}
      </div>
      {props.replies.length > 0 && (
        <div className="comment-replies">
          {props.replies.map((reply) => (
            <Comment key={reply._id} comment={reply} replies={[]}
                     userID={props.userID} threadID={props.threadID}/>
          ))}
        </div>
        )}
    </div>
  )
}

export default Comment
