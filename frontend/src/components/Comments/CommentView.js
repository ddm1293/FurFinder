import '../../style/Comments.css'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import { useSelector } from 'react-redux'

function CommentView (props) {
  const user = useSelector((state) => state.user)
  const isLogin = user.id !== null

  return (
    <div className="comment-main">
      <h3>Comments</h3>
      {isLogin && (
        <div className="comment-add">
          <div><CommentInput threadID={props.threadID} parentID={null}/></div>
        </div>
      )}
      <CommentList threadID={props.threadID} user={user}/>
    </div>
  )
}

export default CommentView