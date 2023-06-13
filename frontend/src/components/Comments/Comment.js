import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

function Comment ({ comment }) {
  return (
    <div className="comment-container" >
      <div className="comment-info">
        <Avatar icon={<UserOutlined/>}/>
        <div className="comment-username">{comment.userName}</div>
        <div className="comment-time">{comment.createdAt}</div>
      </div>
      <div className="comment-body">{comment.body}</div>
    </div>
  )
}

export default Comment;
