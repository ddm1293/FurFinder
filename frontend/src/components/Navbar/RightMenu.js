import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { logoutUser } from '../../store/userSlice';
import "../../style/Navbar.css";

const RightMenu = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    function logout() {
        dispatch(logoutUser());
        navigate("/");
    }

    function login() {
        navigate("/login");
    }

    return (
        <Menu mode={mode}>
            <Menu.SubMenu
                title={
                    <>
                        {user.username
                            ? <Avatar src={user.avatar} />
                            : <Avatar icon={<UserOutlined />} />
                        }
                        <span className="username">{
                            user.username || 'Guest'
                        }</span>
                    </>
                }
            >
                {user.username &&
                    <Menu.Item key="profile">
                        <CodeOutlined /> <Link to="/profile">Your Profile</Link>
                    </Menu.Item>
                }
                {user.username &&
                    <Menu.Item key="personal-settings">
                        <UserOutlined /> <Link to="/settings">Settings</Link>
                    </Menu.Item>
                }
                {user.username
                    ? <Menu.Item key="log-out" onClick={logout}>
                          <LogoutOutlined /> Logout
                      </Menu.Item>
                    : <Menu.Item key="log-in" onClick={login}>
                          <LoginOutlined /> Login
                      </Menu.Item>
                }
            </Menu.SubMenu>
        </Menu>
    );
};

export default RightMenu;
