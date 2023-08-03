import {
  ShopOutlined,
   StarFilled,
  UserOutlined
} from '@ant-design/icons'
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "User Profile",
            icon: <UserOutlined />,
            key: "/",
          },
          {
            label: "My Thread Listing",
            key: "/listing",
            icon: <ShopOutlined />,
          },
          {
            label: "Favorite Thread",
            key: "/favorite",
            icon: <StarFilled />,
          }
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;