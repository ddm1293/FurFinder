import React, { useState } from "react";
import { Layout, Button, Drawer } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { MenuOutlined } from "@ant-design/icons";
import icon from "./icon.png";
const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(!visible);
    };
    return (
        <nav className="navbar">
            <Layout>
                <Layout.Header className="nav-header">
                    <img className="logo" src={icon} alt="icon"></img>
                    <div className="navbar-menu">
                        <div className="leftMenu">
                            <LeftMenu mode={"horizontal"} />
                        </div>
                        <Button className="menuButton" type="text" onClick={showDrawer}>
                            <MenuOutlined />
                        </Button>
                        <div className="rightMenu">
                            <RightMenu mode={"horizontal"} />
                        </div>

                        <Drawer
                            title={"Brand Here"}
                            placement="left"
                            closable={true}
                            onClose={showDrawer}
                            visible={visible}
                            style={{ zIndex: 99999 }}
                        >
                            <LeftMenu mode={"inline"} />
                            <RightMenu mode={"inline"} />
                        </Drawer>
                    </div>
                </Layout.Header>
            </Layout>
        </nav>
    );
};

export default Navbar;