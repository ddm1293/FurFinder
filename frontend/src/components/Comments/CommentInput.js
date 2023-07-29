import { useState } from 'react'
import { Input, Button } from 'antd'
import { addCommentAsync } from '../../thunk/commentThunk'
import { useDispatch, useSelector } from 'react-redux'
import { sendEmailNotification } from '../../sendEmailNotification'
import axios from 'axios'

const { TextArea } = Input

function CommentInput (props) {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState('')
  const isEmptyComment = comment.length === 0 // disable button when no comment
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setComment(event.target.value)
  }
  const handleClick = (event) => {
    event.preventDefault()
    const newComment = {
      content: comment,
      author: {
        id: user.id
      },
      threadId: props.threadID,
      parentId: props.parentID,
    }
    dispatch(addCommentAsync({ threadID: props.threadID, newComment: newComment}))
      .then(async () => {
        await sendCommentNotification(props.threadID);
        setComment('');
        if (props.handleSubmit) {
          props.handleSubmit();
        }
      })
  }

  async function sendCommentNotification(threadID) {
    try {
      const thread = await axios.get(`http://localhost:3001/thread/${threadID}`);
      console.log('Thread when comment', thread);
      const posterId = thread.data.thread.poster;

      const poster = await axios.get(`http://localhost:3001/user/${posterId}`);
      console.log('Poster when comment', poster);

      await sendEmailNotification(
        poster.data.user.email,
        poster.data.user.username,
        `http://localhost:3000/threads/${threadID}`
      );
    } catch (error) {
      console.error('Error in sendCommentEmailNotification:', error);
    }
  }

  return (
    <div className="comment-input">
      <TextArea className="comment-text" rows={4} placeholder="Leave your comment" value={comment}
                onChange={handleChange} />
      <Button type="primary" onClick={handleClick} disabled={isEmptyComment}
              style={{ marginTop: '10px'}}>Comment</Button>
    </div>
  )
}

export default CommentInput
