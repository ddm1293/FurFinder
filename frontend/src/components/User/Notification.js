import '../../style/YourProfile.css'
import { useSelector } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'
import { Divider, Form, Switch } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { getApiUrl } from '../../utils/getApiUrl'

export default function Notification () {
  const user = useSelector((state) => state.user);
  const [subscription, setSubscription] = useState({});
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate({
      url: getApiUrl(`/user/me`),
    }).then((response) => {
      setSubscription(response.data.user.subscription);
      console.log("subscription before", response.data.user.subscription);
    }).catch((error) => {
      console.log(error)
    });
  }, [user])

  const handleSwitchChange = (name, checked) => {
    setSubscription((prevSubscription) => ({
      ...prevSubscription,
      [name]: checked,
    }));
    axiosPrivate({
      url: getApiUrl(`/user/${user.id}`),
      method: 'patch',
      data: { subscription: { ...subscription, [name]: checked } },
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setSubscription(response.data.user.subscription);
      console.log("subscription after", response);
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
          <Switch checked={subscription.newComment} onChange={(checked) => handleSwitchChange('newComment', checked)} />
        </Form.Item>
        <Divider style={{ margin: 0 }} />
        <h4>Relevant Thread</h4>
        <p>You will receive email notification when there is a new relevant thread on your thread.</p>
        <Form.Item name="relevantThread">
          <Switch checked={subscription.relevantThread}
                  onChange={(checked) => handleSwitchChange('relevantThread', checked)} />
        </Form.Item>
      </Form>
      <Divider/>
    </div>
  )
};
