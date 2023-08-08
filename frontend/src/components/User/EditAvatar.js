import '../../style/YourProfile.css'
import { Button, Form, Upload } from 'antd'
import { SaveOutlined, UploadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import DisplayAvatar from './DisplayAvatar'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { getApiUrl } from '../../utils/getApiUrl'

export default function EditAvatar () {
  const user = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();

  const onFinish = async (values) => {
    const formData = new FormData();
    if (values.avatar && values.avatar.length > 0) {
      formData.append('avatar', values.avatar[0].originFileObj, values.avatar[0].originFileObj.name);
    }
    axiosPrivate({
      url: getApiUrl(`/user/${user.id}/updateAvatar`),
      method: 'patch',
      data: formData,
      headers: { 'Content-Type' : 'multipart/form-data'}
    }).then(() => {
      window.location.reload();
    }).catch((error) => {
      console.error('Error fetching data', error);
    })
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }

  return (
    <div className="user-avatar">
      <DisplayAvatar currentUser={user.id} size={150}/>
      <Form className="edit-avatar" onFinish={onFinish}>
        <Form.Item name="avatar" valuePropName="fileList" getValueFromEvent={normFile}
                   rules={[{required: true, message: "Please upload your profile picture"}]}>
          <Upload name="upload-avatar" action="" accept=".jpg,.png,.jpeg" listType="picture"
                  maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />} style={{marginTop: "10px"}}>Upload Profile Picture</Button>
          </Upload>
        </Form.Item>
        <Form.Item style={{ 'marginLeft': '5px' }}>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{marginTop: "10px"}}>Save</Button>
        </Form.Item>
      </Form>
    </div>
  )
};
