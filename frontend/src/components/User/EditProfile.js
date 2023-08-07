import '../../style/YourProfile.css'
import { Button, Divider, Form, Input } from 'antd'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setUser } from '../../store/userSlice'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import EditAvatar from './EditAvatar'
import { getApiUrl } from '../../utils/getApiUrl'

export default function EditProfile () {
  const user = useSelector((state) => state.user);
  const [editFields, setEditFields] = useState(false);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const onFinish = async (values) => {
    console.log(values)
    axiosPrivate({
      url: getApiUrl(`/user/${user.id}`),
      method: 'patch',
      data: values,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      console.log('update user email', response)
      dispatch(setUser({
        ...user,
        email: response.data.user.email
      }))
    }).then(() => {
      setEditFields(false)
    }).catch(error => {
      console.error('Error fetching data', error)
    })
  }

  return (
    <div className="edit-profile" >
      <h2><UserOutlined style={{ marginRight: '10px'}}/>User Profile</h2>
      <Divider />
      <div className="profile">
        <span style={{ marginRight: '100px'}}><EditAvatar/></span>
        <Form onFinish={onFinish}>
          {/* <h4>User ID</h4> */}
          {/* <span className="profile-input">{user.id}</span> */}
          <h4 style={{ marginTop: 0}}>User Name</h4>
          <span className="profile-input">{user.username}</span>
          <h4>Email</h4>
          <Form.Item name="email">
            {!editFields ?
              <div>
                <span className="profile-input">{user.email}</span>
                {user.username !== user.email &&
                  <EditOutlined onClick={() => { setEditFields(true) }} style={{ marginLeft: '10px'}} />
                }
              </div> :
              <Input className="profile-input" size={'small'}/> // no email saved or not editing
            }
          </Form.Item>
          <Form.Item>
            {editFields &&
              <div>
                <Button type="primary" htmlType="submit" style={{ marginRight: '10px'}}>Save</Button>
                <Button type="primary" onClick={() => { setEditFields(false) }}>Cancel</Button>
              </div>
            }
          </Form.Item>
        </Form>
      </div>
    </div>
  )
};
