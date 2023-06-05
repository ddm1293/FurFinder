import React from "react";
import { Menu } from "antd";
import "../../style/Navbar.css";

const LeftMenu = ({ mode }) => {
    return (
        <Menu mode={mode}>
            <Menu.Item key="Lost Pets">Lost Pets</Menu.Item>
            <Menu.Item key="features">Witnesses</Menu.Item>
            <Menu.Item key="about">About Us</Menu.Item>
            <Menu.Item key="contact">Contact Us</Menu.Item>
        </Menu>
    );
};

export default LeftMenu;
