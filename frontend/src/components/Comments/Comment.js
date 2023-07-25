import { DeleteOutlined, MessageOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { deleteCommentAsync } from '../../thunk/commentThunk'
import { useDispatch } from 'react-redux'
import CommentInput from './CommentInput'
import axios from 'axios'
import DisplayAvatar from '../User/DisplayAvatar'

function Comment (props) {
  const [commenter, setCommenter] = useState({})
  const dispatch = useDispatch();
  const isLogin = props.userID !== null;
  const isAuthor = props.userID === props.comment.author.id;
  const isReply = props.comment.parentId !== null;
  const [reply, setReply] = useState('');
  const isReplying = reply && (reply._id === props.comment._id); // where to render comment form

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${props.comment.author.id}`)
      .then((response) => {
        setCommenter(response.data.user)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [props.comment.author])

  return (
    <div className="comment-container">
      <div className="comment-info">
        <DisplayAvatar currentUser = {props.comment.author.id}/>
        <div className="comment-username">{commenter.username}</div>
        <div className="comment-time" style={{ marginLeft: "auto" }}>
          {props.comment.date.replace(/T/, ' ').substring(0, 19)}
        </div>
      </div>
      <div className="comment-content">{props.comment.content}</div>
      <div>
        <div className="comment-buttons">
          {isAuthor && (
            <div onClick={() => { dispatch(deleteCommentAsync(props.comment))}}
                 style={{ marginRight: '10px', cursor: 'pointer', fontSize: '10pt'}}>
              <DeleteOutlined /> Delete
            </div>)
          }
          {(isLogin && !isReply) && (
            <div onClick={() => {setReply(props.comment)}}
                 style={{ marginRight: '10px', cursor: 'pointer', fontSize: '10pt'}}>
              <MessageOutlined /> Reply
            </div>)
          }
        </div>
        {isReplying && (
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
