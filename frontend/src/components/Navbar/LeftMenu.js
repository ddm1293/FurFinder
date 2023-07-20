import React from "react";
import { Link } from 'react-router-dom';
import { Menu } from "antd";
import "../../style/Navbar.css";

// const LeftMenu = ({ mode }) => {
//     return (
//         <Menu mode={mode}>
//             <Menu.Item key="Lost Pets">
//               <Link to="/threads" state={{ filterOptions: "lost", shouldOpenCreateThreadForm: false, threadType: 'lostPetThread' }}>Lost Pets</Link>
//             </Menu.Item>
//             <Menu.Item key="features">
//               <Link to="/threads" state={{ filterOptions: "witness", shouldOpenCreateThreadForm: false, threadType: 'witnessThread' }}>Witnesses</Link>
//             </Menu.Item>
//             <Menu.Item key="about">
//               <Link to="/">About</Link>
//             </Menu.Item>
//         </Menu>
//     );
// };

const LeftMenu = ({ mode }) => {
  const menuItems = [
    {
      key: "Lost Pets",
      title: "Lost Pets",
      link: "/threads",
      state: {
        filterOptions: "lost",
        shouldOpenCreateThreadForm: false,
        threadType: 'lostPetThread'
      }
    },
    {
      key: "features",
      title: "Witnesses",
      link: "/threads",
      state: {
        filterOptions: "witness",
        shouldOpenCreateThreadForm: false,
        threadType: 'witnessThread'
      }
    },
    {
      key: "about",
      title: "About",
      link: "/"
    }
  ];

  return (
    <Menu mode={mode}>
      {menuItems.map(item => (
        <Menu.Item key={item.key}>
          <Link to={item.link}
                state={item.state}>
            {item.title}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default LeftMenu;
