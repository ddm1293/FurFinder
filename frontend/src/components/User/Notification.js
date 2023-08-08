import '../../style/YourProfile.css'
import { useDispatch, useSelector } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { Divider, Form, Switch } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { getApiUrl } from '../../utils/getApiUrl'
import { setUser } from '../../store/userSlice'

export default function Notification () {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const handleSwitchChange = (name, checked) => {
    axiosPrivate({
      url: getApiUrl(`/user/${user.id}`),
      method: 'patch',
      data: { subscription: { ...user.subscription, [name]: checked } },
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      console.log(response);
      dispatch(setUser({
        ...user,
        subscription: response.data.user.subscription
      }))
    }).catch(error => {
      console.error('Error updating user subscription', error)
    })
  };

  return (
    <div>
      <h2><BellOutlined style={{ marginRight: '10px'}}/>Notification</h2>
      <Divider/>
      <Form>
        <h4>New Comment</h4>
        <p>You will receive email notification when there is a new comment on your thread.</p>
        <Form.Item name="newComment" className="custom-switch">
          <Switch checked={user.subscription.newComment}
                  onChange={(checked) => handleSwitchChange('newComment', checked)} />
        </Form.Item>
        <Divider style={{ margin: 0 }} />
        <h4>Relevant Thread</h4>
        <p>You will receive email notification when there is a new relevant thread on your thread.</p>
        <Form.Item name="relevantThread">
          <Switch checked={user.subscription.relevantThread}
                  onChange={(checked) => handleSwitchChange('relevantThread', checked)} />
        </Form.Item>
      </Form>
      <Divider/>
    </div>
  )
};
