import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'; // import the setUser action creator from your userSlice file
import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import jwt_decode from 'jwt-decode';
import '../style/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);

    dispatch(setUser({ username: userObject.name, avatar: userObject.picture }));
    navigate("/profile");
  }

  useEffect(() => {
    const google = window.google;

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('sign-in-button'),
      { theme: 'outline', size: 'large' },
    );
  }, []);

  return (
    <div id="login-form">
      <h1>Log In</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item id="login-form__login">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <a className="login-form__forgot" href="">
            Forgot password?
          </a>
        </Form.Item>
        <Form.Item id="login-form__register">
          <a href="">New? Register now!</a>
        </Form.Item>
      </Form>
      <Divider>OR</Divider>
      <div id="sign-in-button"></div>
    </div>
  );
};
