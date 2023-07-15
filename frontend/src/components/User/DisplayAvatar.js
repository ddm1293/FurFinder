import '../../style/EditProfile.css'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import defaultAvatar from "../../static/avatar.png"
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'

export default function DisplayAvatar (props) {
  const user = useSelector((state) => state.user);
  const [avatarURL, setAvatarURL] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
      axiosPrivate({
        url: `http://localhost:3001/user/${user.id}/getAvatar`,
      }).then(response => {
        console.log("user avatar", response);
        const url = getAvatarURL(response);
        setAvatarURL(url);
      }).catch(error => {
          console.error('Error fetching data', error);
        });
  }, []);

  const getAvatarURL = (response) => {
    if (response.data === "" && user.avatar) { // google pic
      return user.avatar;
    } else if (response.data && response.data.avatar) {
      const userAvatar = response.data.avatar;
      return`data:${userAvatar.contentType};base64,${userAvatar.data}`;
    }
    return defaultAvatar;
  }

  return (
    <Avatar src={avatarURL} size={props.size}/>
  )
};