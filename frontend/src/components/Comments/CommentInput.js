import { useState } from 'react'
import { Input, Button } from 'antd'
import { addCommentAsync } from '../../thunk/commentThunk'
import { useDispatch } from 'react-redux'

const { TextArea } = Input

function CommentInput (props) {
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
        id: '64823ca71623f19e8667501e' // TODO: req.user.id
      },
      threadId: props.threadID
    }
    dispatch(addCommentAsync({ threadID: props.threadID, newComment: newComment}))
      .then(() => {
        setComment('');
      })
  }

  return (
    <div className="comment-input">
      <TextArea className="comment-text" rows={4} placeholder="Leave your comment" value={comment}
                onChange={handleChange} />
      <Button className="comment-button" type="primary" onClick={handleClick}
              disabled={isEmptyComment}>Comment</Button>
    </div>
  )
}

export default CommentInput
