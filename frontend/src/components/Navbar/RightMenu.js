import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { logoutUser } from '../../store/userSlice';
import "../../style/Navbar.css";
import axios from 'axios';
import DisplayAvatar from '../User/DisplayAvatar';
import CreateThreadButton from '../CreateThread/CreateThreadButton';
import { getApiUrl } from '../../utils/getApiUrl'

const RightMenu = ({ mode }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    async function logout() {
      await axios.get(getApiUrl('/auth/logout'), {
        withCredentials: true
      });

      dispatch(logoutUser());
      navigate("/");
    }

    function login() {
        navigate("/login");
    }

    return (
      <Menu mode={mode}>
        {user.id
          ? <Menu.Item key="create-button-menu-item" className="create-button-menu-item">
              <CreateThreadButton />
            </Menu.Item>
          : <Menu.SubMenu key="placeholder-menu-item"></Menu.SubMenu>
        }
        <Menu.SubMenu
          key="avatar-menu-item"
          title={
            <>
              {user.username ? (
                <DisplayAvatar currentUser={user.id}/>
              ) : (
                <Avatar icon={<UserOutlined />} />
              )}
              <span className="username">{user.username || 'Guest'}</span>
            </>
          }
        >
          {user.username ? (
            <>
              <Menu.Item key="profile">
                <CodeOutlined /> <Link to="/profile">Your Profile</Link>
              </Menu.Item>
              {/* <Menu.Item key="personal-settings"> */}
              {/*   <UserOutlined /> <Link to="/settings">About</Link> */}
              {/* </Menu.Item> */}
              <Menu.Item key="log-out" onClick={logout}>
                <LogoutOutlined /> Logout
              </Menu.Item>
            </>
          ) : (
            <Menu.Item key="log-in" onClick={login}>
              <LoginOutlined /> Login
            </Menu.Item>
          )}
        </Menu.SubMenu>
      </Menu>
    );
  };

export default RightMenu;
