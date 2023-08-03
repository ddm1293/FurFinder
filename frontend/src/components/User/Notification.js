import '../../style/Notification.css'
import { useSelector } from 'react-redux'
import { Card, Divider, Form, Switch } from 'antd'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'

export default function Notification () {
  const user = useSelector((state) => state.user);
  const [subscription, setSubscription] = useState({});
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate({
      url: `http://localhost:3001/user/me`,
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
      url: `http://localhost:3001/user/${user.id}`,
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
      <Card title="Your Email Setting: " className='custom-card'>
        <Form >
          <Form.Item label="New Comment" name='newComment' className='custom-switch' >
            <Switch checked={subscription.newComment} onChange={(checked) => handleSwitchChange('newComment', checked)} />
          </Form.Item>
          <Divider />
          <Form.Item label="Relevant Thread" name='relevantThread' >
            <Switch checked={subscription.relevantThread} onChange={(checked) => handleSwitchChange('relevantThread', checked)}/>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
};