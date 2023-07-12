import '../../style/EditProfile.css'
import defaultAvatar from "../../static/avatar.png";
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'

export default function DisplayAvatar (props) {
  const user = useSelector((state) => state.user);

  const getAvatar = (userAvatar) => {
    return `data:${userAvatar.contentType};base64,${userAvatar.data}`;
  }

  const getImageURL = (userAvatar) => {
    if (userAvatar && userAvatar.data) {
      return getImageURL(getAvatar(userAvatar));
    } else if (userAvatar) { // google login
      return userAvatar;
    } else {
      return defaultAvatar;
    }
  }

  return (
    <Avatar src={getImageURL(user.avatar)} size={props.size}/>
  )
};