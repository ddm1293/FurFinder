import '../../style/Comments.css'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCommentsAsync } from '../../thunk/commentThunk'

function CommentView (props) {
  const user = useSelector((state) => state.user)
  const isLogin = user.id !== null
  const commentList = useSelector((state) => state.comments.commentList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCommentsAsync(props.threadID))
  }, [dispatch])

  if (!commentList) {
    return <div>Loading...</div>
  }

  return (
    <div className="comment-main">
      <h3>Comments</h3>
      {isLogin && (
        <div className="comment-add">
          <div><CommentInput threadID={props.threadID} parentID={null}/></div>
        </div>
      )}
      <CommentList threadID={props.threadID} userID={user.id} commentList={commentList}/>
    </div>
  )
}

export default CommentView