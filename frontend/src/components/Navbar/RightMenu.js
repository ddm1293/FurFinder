import React from "react";
import { Link } from 'react-router-dom';
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import "../../style/Navbar.css";

const RightMenu = ({ mode }) => {
    return (
        <Menu mode={mode}>
            <Menu.SubMenu
                title={
                    <>
                        <Avatar icon={<UserOutlined />} />
                        <span className="username">Marry Browns</span>
                    </>
                }
            >
                <Menu.Item key="profile">
                    <CodeOutlined /> <Link to="/profile">Your Profile</Link>
                </Menu.Item>
                <Menu.Item key="personal-settings">
                    <UserOutlined /> <Link to="/settings">Settings</Link>
                </Menu.Item>
                <Menu.Item key="log-out">
                    <LogoutOutlined /> Logout
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

export default RightMenu;
