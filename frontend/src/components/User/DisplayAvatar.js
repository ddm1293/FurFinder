import '../../style/EditProfile.css'
import defaultAvatar from "../../static/avatar.png";
import { Avatar } from 'antd'

export default function DisplayAvatar (props) {
  const user = props.user;

  const getAvatar = (userAvatar) => {
    return `data:${userAvatar.contentType};base64,${userAvatar.data}`;
  }

  return (
    <div >
      {user.avatar && user.avatar.data ?
        <Avatar src={<img src={getAvatar(user.avatar)} alt="user avatar" />} />:
        <Avatar src={<img src={defaultAvatar} alt="user avatar" />} />
      }
    </div>
  )
};