import '../../style/EditProfile.css'
import defaultAvatar from "../../static/avatar.png";
import { Avatar, Button, Form, Upload } from 'antd'
import { SaveOutlined, UploadOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/userSlice'
import axios from 'axios'

export default function EditAvatar () {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const formData = new FormData();
    console.log(values);
    if (values.avatar && values.avatar.length > 0) {
      formData.append('avatar', values.avatar[0].originFileObj, values.avatar[0].originFileObj.name);
    }
    const updatedUser = await axios.patch(`http://localhost:3001/user/${user.id}/avatar`, formData);
    dispatch(setUser({
      id: user.id,
      username: user.username,
      avatar: updatedUser.data.user.avatar,
      favoredThreads: user.favoredThreads,
      myThreads: user.myThreads,
      accessToken: user.accessToken
    }));
  }

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }

  const getAvatar = (userAvatar) => {
    return `data:${userAvatar.contentType};base64,${userAvatar.data}`;
  }

  return (
    <div className="profile">
      {user.avatar && user.avatar.data ?
        <Avatar src={<img src={getAvatar(user.avatar)} alt="user avatar" />} size={150} />:
        <Avatar src={<img src={defaultAvatar} alt="user avatar" />} size={150} />
      }
      <Form className="edit-profile-picture" onFinish={onFinish}>

        <Form.Item name="avatar" valuePropName="fileList" getValueFromEvent={normFile}
                   rules={[{required: true, message: "Please upload your profile picture"}]}>
          <Upload name="upload-avatar" action="" accept=".jpg,.png,.jpeg" listType="picture"
                  maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
        </Form.Item>
        <Form.Item style={{ 'marginLeft': '5px' }}>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined /> }>Save</Button>
        </Form.Item>
      </Form>
    </div>
  )
};