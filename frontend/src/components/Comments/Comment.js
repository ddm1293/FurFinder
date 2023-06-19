import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Comment ({ comment }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${comment.author.id}`)
      .then((response) => {

        setUserName(response.data.user.username)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [comment.author])

  return (
    <div className="comment-container">
      <div className="comment-info">
        <Avatar icon={<UserOutlined />} />
        <div className="comment-username">{userName}</div>
        <div className="comment-time">{comment.date}</div>
      </div>
      <div className="comment-body">{comment.content}</div>
    </div>
  )
}

export default Comment
