import React from "react";
import "../../style/Navbar.css";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";

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
                    <CodeOutlined /> Profile
                </Menu.Item>
                <Menu.Item key="personal-settings">
                    <UserOutlined /> Personal Settings
                </Menu.Item>
                <Menu.Item key="log-out">
                    <LogoutOutlined /> Logout
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

export default RightMenu;
