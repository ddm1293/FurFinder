import { useState } from 'react'
import { Input, Button } from 'antd'
import axios from 'axios'

const { TextArea } = Input

function CommentInput (props) {
  const [comment, setComment] = useState('')
  const isEmptyComment = comment.length === 0 // disable button when no comment

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
    axios.post(`http://localhost:3001/comment/${props.threadID}/create`, newComment)
      .then(function (response) {
        setComment('')
      })
      .catch(function (error) {
        console.log(error)
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
