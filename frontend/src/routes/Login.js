import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { setUser } from '../store/userSlice'; // import the setUser action creator from your userSlice file
import '../style/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const usernameField = Form.useWatch('username', form);
  const passwordField = Form.useWatch('password', form);
  const [incorrectWarning, setIncorrectWarning] = useState('');

  const login = async (values) => {
    try {
      const res = await axios({
        url: `http://localhost:3001/user/${values.username}`, // TODO: better handling of baseURL?
        params: {
          password: values.password,
        },
      });

      if (res.data.user) {
        dispatch(setUser({ username: res.data.user.username })); // TODO: store and handle exp field, among other fields from the db
        navigate("/profile");
      } else {
        setIncorrectWarning(res.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  async function loginFromGoogle(response) {
    const userObject = jwt_decode(response.credential);
    // console.log(userObject);

    try {
      const res = await axios({
        url: `http://localhost:3001/user/${userObject.email}`, // TODO: better handling of baseURL?
        params: {
          didSignInFromGoogle: true,
        },
      });
      console.log(res.data);

      dispatch(setUser({ username: res.data.user.username, avatar: userObject.picture })); // TODO: store and handle exp field, among other fields from the db
      navigate("/profile");
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const google = window.google;

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: loginFromGoogle,
    });
    google.accounts.id.renderButton(
      document.getElementById('sign-in-button'),
      { theme: 'outline', size: 'large' },
    );
  }, []);

  useEffect(() => {
    setIncorrectWarning('');
  }, [usernameField, passwordField]);

  return (
    <div id="login-form">
      <h1>Log In</h1>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={login}
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
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {incorrectWarning && <Form.Item style={{ color: 'red' }}>{incorrectWarning}</Form.Item>}
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
