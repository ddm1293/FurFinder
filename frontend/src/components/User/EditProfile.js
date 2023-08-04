import '../../style/EditProfile.css'
import { Button, Form, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setUser } from '../../store/userSlice'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

export default function EditProfile () {
  const user = useSelector((state) => state.user);
  const [editFields, setEditFields] = useState(false);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const onFinish = async (values) => {
    console.log(values)
    axiosPrivate({
      url: `/user/${user.id}`,
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
    <Form className="edit-profile" onFinish={onFinish}>
      <div style={{ marginBottom: '10px'}}>User Name: {user.username}</div>
      <Form.Item label="Email" name="email">
        {!editFields || user.username === user.email ? // google login
          <div>
            {user.email}
            <EditOutlined onClick={() => { setEditFields(true) }} style={{ marginLeft: '10px' }} />
          </div> :
          <Input style={{ width: '20%' }} size={'small'}/> // no email saved or not editing
        }
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>Save</Button>
        <Button type="primary" onClick={() => { setEditFields(false) }}>Cancel</Button>
      </Form.Item>
    </Form>
  )
};
