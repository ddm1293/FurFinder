import '../../style/Comments.css'
import CommentInput from './CommentInput'
import Comment from './Comment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentAsync, getCommentsAsync } from '../../thunk/commentThunk'
import { Button } from 'antd'
import { CommentOutlined, DeleteOutlined } from '@ant-design/icons'

function CommentView (props) {
  const user = useSelector((state) => state.user)
  const commentList = useSelector((state) => state.comments.commentList)
  const dispatch = useDispatch()
  const hasLogin = user.id !== null

  useEffect(() => {
    dispatch(getCommentsAsync(props.threadID))
  }, [dispatch])

  if (!commentList) {
    return <div>Loading...</div>
  }

  const handleDelete = (comment) => {
    dispatch(deleteCommentAsync(comment))
      .then(() => {
        dispatch(getCommentsAsync(props.threadID))
      })
  }

  return (
    <div className="comment-main">
      <h3>Comments</h3>
      {hasLogin && (
        <div className="comment-add">
          <div><CommentInput threadID={props.threadID} /></div>
        </div>
      )}
      <div className="comment-list">
        {commentList.map((comment) => {
          const isAuthor = user.id === comment.author.id
          return (
            <div className="comment-content" key={comment._id}>
              <Comment comment={comment} />
              <div className="comment-button">
                <Button type="primary"
                        style={{ marginRight: '10px', background: 'grey' }}
                        icon={<CommentOutlined />}>Reply
                </Button>
                {isAuthor && (
                  <Button type="primary" onClick={() => {handleDelete(comment)}}
                          style={{ marginRight: '10px', background: 'grey' }}
                          icon={<DeleteOutlined />}>Delete
                  </Button>
                )}
              </div>
            </div>
          )})
        }
      </div>
    </div>
  )
}

export default CommentView