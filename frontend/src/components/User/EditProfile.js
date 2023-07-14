import '../../style/EditProfile.css'
import { Button, Form, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setUser } from '../../store/userSlice'
import axios from 'axios'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

export default function EditProfile () {
  const user = useSelector((state) => state.user);
  const [editFields, setEditFields] = useState(false);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const onFinish = async (values) => {
    console.log(values);
    axiosPrivate({
      url: `http://localhost:3001/user/${user.id}`,
      method: 'patch',
      data: values,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      console.log("update user", response);
      dispatch(setUser({
        id: user.id,
        username: response.data.user.username,
        avatar: user.avatar,
        favoredThreads: user.favoredThreads,
        myThreads: user.myThreads,
        accessToken: user.accessToken
      }));
    }).then(() => {
      setEditFields(false);
    }).catch(error => {
      console.error('Error fetching data', error);
    })

  }

  return (
      <Form className="edit-profile" onFinish={onFinish}>
        <div className="user-profile">
          <Form.Item label="User Name" name="username">
            {editFields ?
              <Input /> :
              <div>{user.username}
                <EditOutlined onClick={() => {setEditFields(true)}} style={{ 'marginLeft': '10px' }}/>
              </div>
            }
          </Form.Item>
          <Form.Item style={{ 'marginTop': '10px' }}>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button type="primary" onClick={() => {setEditFields(false)}}>Cancel</Button>
          </Form.Item>
        </div>
      </Form>
  )
};