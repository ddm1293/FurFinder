import { Link } from 'react-router-dom';
import { Menu } from "antd";
import "../../style/Navbar.css";

const LeftMenu = ({ mode }) => {
  const menuItems = [
    {
      key: "Lost Pets",
      title: "Lost Pets",
      link: "/threads",
      state: {
        filterOptions: "LostPetThread",
        threadType: 'lostPetThread'
      }
    },
    {
      key: "features",
      title: "Witnesses",
      link: "/threads",
      state: {
        filterOptions: "WitnessThread",
        threadType: 'witnessThread'
      }
    }
  ];

  return (
    <div>
    <Menu mode={mode}>
      {menuItems.map(item => (
        <Menu.Item key={item.key} >
          <Link to={item.link }
                state={item.state}>
            {item.title}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
    </div>
  );
};

export default LeftMenu;
