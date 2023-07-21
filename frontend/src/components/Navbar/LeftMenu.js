import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from "antd";
import "../../style/Navbar.css";
import axios from 'axios'



const LeftMenu = ({ mode }) => {
  const [threads, setThreads] = useState([]);

  const menuItems = [
    {
      key: "Lost Pets",
      title: "Lost Pets",
      link: "/threads",
      state: {
        filterOptions: "LostPetThread",
        shouldOpenCreateThreadForm: false,
        threadType: 'lostPetThread'
      }
    },
    {
      key: "features",
      title: "Witnesses",
      link: "/threads",
      state: {
        filterOptions: "WitnessThread",
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

  const fetchThreads = async (selectedThreadType) => {
    try {
      const response = await axios.get(`http://localhost:3001/thread/get${selectedThreadType}`);
      setThreads(response.data.threads);
      console.log(response.data.threads);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Call the fetchThreads function with the initial selected thread type
    fetchThreads(menuItems[0].state.threadType);
  }, []); // Empty dependency array to fetch the initial threads only once


  const handleMenuItemClick = (selectedThreadType) => {
    // Fetch the threads based on the selected thread type when a menu item is clicked
    fetchThreads(selectedThreadType);
  };

  return (
    <div>
    <Menu mode={mode}>
      {menuItems.map(item => (
        <Menu.Item key={item.key} >
          <Link to={item.link }
                onClick={()=> handleMenuItemClick(item.state.filterOptions)}
                state={item.state}>
            {item.title}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
    </div>
  );
};

// const LeftMenu = ({ mode }) => {
//     return (
//         <Menu mode={mode}>
//             <Menu.Item key="Lost Pets">
//               <Link to="/threads"
//                     state={{ filterOptions: "lost", shouldOpenCreateThreadForm: false, threadType: 'lostPetThread' }}
//                     onClick={()=> handleMenuItemClick(state.filterOptions)}
//               >Lost Pets</Link>
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



export default LeftMenu;
