import '../../style/Comments.css'
import Comment from './Comment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsAsync } from '../../thunk/commentThunk'

function CommentList (props) {
  const commentList = useSelector((state) => state.comments.commentList)
  const dispatch = useDispatch()
  const parentComments = commentList.filter((comment) => comment.parentId === null)

  useEffect(() => {
    dispatch(getCommentsAsync(props.threadID))
  }, [dispatch])

  if (!commentList) {
    return <div>Loading...</div>
  }

  const getReplies = (commentId) => {
    return commentList
      .filter(comment => comment.parentId === commentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
      <div className="comment-list">
        {parentComments.map((comment) => {
          return (
            <div className="comment-content" key={comment._id}>
              <Comment key={comment._id} comment={comment} replies={getReplies(comment._id)}
                       userID={props.user.id} threadID={props.threadID}
              />
            </div>
          )})
        }
      </div>
  )
}

export default CommentList