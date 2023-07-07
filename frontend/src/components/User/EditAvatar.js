import '../../style/EditProfile.css'
import defaultAvatar from "../../static/avatar.png";
import { Avatar, Button, Form, Upload } from 'antd'
import { SaveOutlined, UploadOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar } from '../../store/userSlice'
import axios from 'axios'
import { Buffer } from 'buffer'

export default function EditAvatar () {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function getAvatarUrl() {
    if (user.avatar && typeof user.avatar === 'string') { // google profile pic
      return user.avatar;
    }
    if (user.avatar && user.avatar.data) { // uploaded avatar
      const base64String = Buffer.from(user.avatar.data, 'binary').toString('base64');
      const imageUrl = `data:${user.avatar.contentType};base64,${base64String}`;
      return imageUrl;
    }
    return null;
  }

  const onFinish = async (values) => {
    const formData = new FormData();
    if (values.avatar && values.avatar.length > 0) {
      formData.append('avatar', values.avatar[0].originFileObj, values.avatar[0].originFileObj.name);
    }
    const updatedUser = await axios.patch(`http://localhost:3001/user/${user.id}/avatar`, formData);
    console.log("updated user:", updatedUser.data.user);
    dispatch(setAvatar(updatedUser.data.user.avatar));
  }

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }

  return (
    <div className="profile">
      {user.avatar ?
        <Avatar src={<img src={getAvatarUrl()} alt="user avatar" />} size={150} /> :
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
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Save</Button>
        </Form.Item>
      </Form>
    </div>
  )
};