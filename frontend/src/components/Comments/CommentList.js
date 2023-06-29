import '../../style/Comments.css'
import Comment from './Comment'

function CommentList (props) {
  const parentComments = props.commentList.filter((comment) => comment.parentId === null)

  const getReplies = (commentId) => {
    return props.commentList
      .filter(comment => comment.parentId === commentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
      <div className="comment-list">
        {parentComments.map((comment) => {
          return (
            <div className="comment-content">
              <Comment key={comment._id} comment={comment} replies={getReplies(comment._id)}
                       userID={props.userID} threadID={props.threadID}
              />
            </div>
          )})
        }
      </div>
  )
}

export default CommentList