import React from "react";
import { Link } from 'react-router-dom';
import { Menu } from "antd";
import "../../style/Navbar.css";

const LeftMenu = ({ mode }) => {
    return (
        <Menu mode={mode}>
            <Menu.Item key="Lost Pets">
              <Link to="/threads" state={{ filterOptions: "lost", shouldOpenCreateThreadForm: false, threadType: 'lostPetThread' }}>Lost Pets</Link>
            </Menu.Item>
            <Menu.Item key="features">
              <Link to="/threads" state={{ filterOptions: "witness", shouldOpenCreateThreadForm: false, threadType: 'witnessThread' }}>Witnesses</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/">About</Link>
            </Menu.Item>
        </Menu>
    );
};

export default LeftMenu;
