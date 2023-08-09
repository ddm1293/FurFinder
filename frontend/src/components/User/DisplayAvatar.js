import '../../style/YourProfile.css'
import { Avatar } from 'antd'
import defaultAvatar from "../../static/avatar.png"
import { useEffect, useState } from 'react'
import axios from 'axios'
import {Buffer} from 'buffer'
import { getApiUrl } from '../../utils/getApiUrl'

export default function DisplayAvatar (props) {
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    axios.get(getApiUrl(`/user/${props.currentUser}/getAvatar`))
      .then((response) => {
        const url = getAvatarURL(response.data.avatar);
        setAvatarURL(url);
      }).catch(error => {
        console.error('Error fetching data', error);
      });
  }, [props.currentUser]);

  const getAvatarURL = (avatar) => {
    if (!avatar.data && avatar.url) {
      return avatar.url;
    } else if (avatar.data && avatar.data.data && avatar.data.type === 'Buffer') {
      const userAvatar = avatar.data.data;
      const base64 = Buffer.from(userAvatar).toString("base64");
      return `data:${avatar.contentType};base64,${base64}`;
    }
    return defaultAvatar;
  }

  return (
    <Avatar src={avatarURL} size={props.size}/>
  )
};
