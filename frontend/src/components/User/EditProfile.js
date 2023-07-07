import '../../style/EditProfile.css'
import { Button, Form, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setUserProfile } from '../../store/userSlice'
import axios from 'axios'

export default function EditProfile () {
  const user = useSelector((state) => state.user);
  const initial = {
    username: false,
    password: false,
    email: false
  };
  const [editFields, setEditFields] = useState(initial);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    const updatedUser = await axios.patch(`http://localhost:3001/user/${user.id}`, values);
    dispatch(setUserProfile({
      username: updatedUser.data.user.username,
      email: updatedUser.data.user.email
    }));
  }

  return (
      <Form className="edit-profile" onFinish={onFinish}>
        <div className="user-profile">
          <Form.Item label="User Name" name="username">
            {editFields.username ?
              <Input /> :
              <div>{user.username}
                <EditOutlined onClick={() => setEditFields(prevState => ({ ...prevState, username: true }))} style={{ 'marginLeft': '10px' }}/>
              </div>
            }
          </Form.Item>
          <Form.Item label="Password" name="password">
            {editFields.password ?
            <Input.Password />:
              <div>**********
                <EditOutlined onClick={() => setEditFields(prevState => ({ ...prevState, password: true }))} style={{ 'marginLeft': '10px' }}/>
              </div>
            }
          </Form.Item>
          {/* <Form.Item label="Email" name="email"> */}
          {/*   {editFields.email ? */}
          {/*     <Input /> : */}
          {/*     <div>{user.email} */}
          {/*       <EditOutlined onClick={() => setEditFields(prevState => ({ ...prevState, email: true }))} style={{'marginLeft': '10px'}}/> */}
          {/*     </div> */}
          {/*   } */}
          {/* </Form.Item> */}
          <Form.Item style={{ 'marginTop': '10px' }}>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button type="primary" onClick={() => {setEditFields(initial)}}>Cancel</Button>
          </Form.Item>
        </div>
      </Form>
  )
};