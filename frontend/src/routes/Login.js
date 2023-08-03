import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
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
        url: `http://localhost:3001/auth/login`, // TODO: better handling of baseURL?
        method: 'post',
        data: {
          username: values.username,
          password: values.password,
        },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // this is what actually sets the cookie in the subsequent request header
      });

      if (res.data.user) {
        console.log("USER", res.data.user);
        dispatch(setUser({
          id: res.data.user._id,
          username: res.data.user.username,
          favoredThreads: res.data.user.favoredThreads,
          myThreads: res.data.user.myThreads,
          accessToken: res.data.accessToken,
          email:  res.data.user.email
        }));
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

    try {
      const res = await axios({
        url: `http://localhost:3001/auth/login`, // TODO: better handling of baseURL?
        method: 'post',
        data: {
          username: userObject.email,
          avatar: {url: userObject.picture},
          didSignInFromGoogle: true,
        },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // this is what actually sets the cookie in the subsequent request header
      });
      console.log(res.data);

      dispatch(setUser({
        id: res.data.user._id,
        username: res.data.user.username,
        // avatar: userObject.picture,
        favoredThreads: res.data.user.favoredThreads,
        myThreads: res.data.user.myThreads,
        accessToken: res.data.accessToken,
        email: userObject.email,
      })); // TODO: store and handle exp field?
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
    <div id="login-form-container">
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
          <Link to="/signup">New? Register now!</Link>
        </Form.Item>
      </Form>
      <Divider>OR</Divider>
      <div id="sign-in-button"></div>
    </div>
  );
};
