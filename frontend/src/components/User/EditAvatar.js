import '../../style/EditProfile.css'
import { Button, Form, Upload } from 'antd'
import { SaveOutlined, UploadOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/userSlice'
import axios from 'axios'
import DisplayAvatar from './DisplayAvatar'

export default function EditAvatar () {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const formData = new FormData();
    console.log(values);
    if (values.avatar && values.avatar.length > 0) {
      formData.append('avatar', values.avatar[0].originFileObj, values.avatar[0].originFileObj.name);
    }
    const updatedUser = await axios.patch(`http://localhost:3001/user/${user.id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }});
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

  return (
    <div className="profile">
      <DisplayAvatar size={150}/>
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