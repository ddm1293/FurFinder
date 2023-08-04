import { useState } from "react";
import { Link } from 'react-router-dom';
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import icon from "../../static/icon.png";
import "../../style/Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const showDrawer = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className="navbar">
            <Layout>
                <Layout.Header className="nav-header">
                    <Link to="/">
                        <img className="logo" src={icon} alt="icon"></img>
                    </Link>
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
                            open={isOpen}
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
