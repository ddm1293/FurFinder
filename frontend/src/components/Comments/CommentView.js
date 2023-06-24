import '../../style/Comments.css'
import CommentInput from './CommentInput'
import Comment from './Comment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentAsync, getCommentsAsync } from '../../thunk/commentThunk'
import { Button } from 'antd'

function CommentView (props) {
  const commentList = useSelector((state) => state.comments.commentList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCommentsAsync(props.threadID))
  }, [dispatch])

  if (!commentList) {
    return <div>Loading...</div>
  }

  const handleDelete = (commentId) => {
    dispatch(deleteCommentAsync(commentId))
      .then(() => {
        dispatch(getCommentsAsync(props.threadID))
      })
  }

  return (
    <div className="comment-main">
      <h3>Comments</h3>
      <div className="comment-add">
        <div><CommentInput threadID={props.threadID} /></div>
      </div>
      <div className="comment-list">
        {commentList.map((comment) => (
          <div key={comment._id}>
            <Comment comment={comment} />
            <Button type="primary" onClick={() => {handleDelete(comment._id)}}
                    style={{ marginRight: '10px', background: 'grey' }}>Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentView