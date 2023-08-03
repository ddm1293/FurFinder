import { useState } from 'react'
import { Input, Button } from 'antd'
import { addCommentAsync } from '../../thunk/commentThunk'
import { useDispatch, useSelector } from 'react-redux'
import { sendNotification } from '../../notification/sendNotification'

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
        // await sendCommentNotification(props.threadID);
        await sendNotification(props.threadID, 'comment');
        setComment('');
        if (props.handleSubmit) {
          props.handleSubmit();
        }
      })
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
