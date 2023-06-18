import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { setUser } from '../store/userSlice';
import '../style/Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const usernameField = Form.useWatch('username', form);
  const passwordField = Form.useWatch('password', form);
  const [incorrectWarning, setIncorrectWarning] = useState('');

  const validatePassword = (rule, value) => {
    if (value
      && value.length > 4
      && /[A-Z]/.test(value)
      && /[a-z]/.test(value)
      && /[0-9]/.test(value)
      && /[^A-Za-z0-9]/.test(value)
    ) {
      return Promise.resolve();
    } else {
      return Promise.reject("Password should contain: " +
        "at least one uppercase letter, " +
        "at least one lowercase letter, " +
        "at least one digit, " +
        "at least one special symbol, " +
        "and should be more than 4 characters.");
    }
  };

  const signup = async (values) => {
    try {
      const res = await axios({
        url: `http://localhost:3001/auth/register`, // TODO: better handling of baseURL?
        method: 'post',
        data: {
          username: values.username,
          password: values.password,
        }
      });
      console.log(res);

      if (res.data.newUser) {
        dispatch(setUser({ username: res.data.newUser.username })); // TODO: store and handle exp field, among other fields from the db
        navigate("/profile");
      } else {
        setIncorrectWarning(res.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setIncorrectWarning('');
  }, [usernameField, passwordField]);

  return (
    <div id="signup-form-container">
      <h1>Sign Up</h1>
      <Form
        form={form}
        name="normal_signup"
        className="signup-form"
        initialValues={{
          remember: true,
        }}
        onFinish={signup}
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
          style={{ maxWidth: "235px" /* TODO: figure out a better way to do this */ }}
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
            {
              validator: validatePassword,
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
        <Form.Item id="signup-form__signup">
          <Button type="primary" htmlType="submit" className="signup-form-button">
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item id="signup-form__login">
          <Link to="/login">Already a member? Log in!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
