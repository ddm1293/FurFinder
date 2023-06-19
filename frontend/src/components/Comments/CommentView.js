import '../../style/Comments.css'
import CommentInput from './CommentInput'
import Comment from './Comment'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'antd'

function CommentView (props) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const getComments = () => {
      axios
        .get(`http://localhost:3001/comment/${props.threadID}/getComments`)
        .then((response) => {
          setComments(response.data.comments.comments) // comment list
        })
        .catch((error) => {
          console.error(error)
        })
    };
    getComments();
    const interval = setInterval(getComments, 1000);
    return () => clearInterval(interval);
  }, [props.threadID]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/comment/${id}`)
      .then((response) => {
        setComments(response.data.comments.comments) // comment list
      })
      .catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className="comment-main">
      <h3>Comments</h3>
      <div className="comment-add">
        <div><CommentInput threadID={props.threadID} /></div>
      </div>
      <div className="comment-list">
        {comments.map((comment) => (
          <div>
            <Comment key={comment._id} comment={comment} />
            <Button type="primary" onClick={() => {handleDelete(comment._id)}} style={{ marginRight: '10px', background: 'grey'}}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentView
