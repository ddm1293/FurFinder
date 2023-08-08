import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import '../style/YourProfile.css';
import { Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import { BellOutlined, HistoryOutlined, StarOutlined, UserOutlined } from '@ant-design/icons'
import EditProfile from '../components/User/EditProfile'
import Notification from '../components/User/Notification'
import MyThreadListing from '../components/User/MyThreadListing'
import FavoriteThread from '../components/User/FavoriteThread'
import { getApiUrl } from '../utils/getApiUrl'
import DisplayAvatar from '../components/User/DisplayAvatar'

export default function YourProfile() {
  const user = useSelector((state) => state.user);
  const axiosPrivate = useAxiosPrivate();

  const test = () => {
    if (user.username) {
      setTimeout(async () => {
        const res = await axiosPrivate({
          url: getApiUrl(`/user/me`),
        });
        const res2 = await axios.get(getApiUrl(`/user/64823ca71623f19e8667501e`));
      }, 1000);
    }
  }

  useEffect(() => {
    test();
  }, []);

  const [selectedKey, setSelectedKey] = useState('user')

  const items1 = [
    {
      key: 'user',
      icon: <UserOutlined />,
      label: 'User Profile'
    },
    {
      key: 'notification',
      icon: <BellOutlined />,
      label: 'Notification'
    },
    {
      key: 'post',
      icon: <HistoryOutlined />,
      label: 'Post History'
    },
    {
      key: 'favourite',
      icon: <StarOutlined />,
      label: 'Favourite'
    }]

  function RenderContent () {
    switch (selectedKey) {
      case 'user':
        return <EditProfile />
      case 'notification':
        return <Notification />
      case 'post':
        return <MyThreadListing />
      case 'favourite':
        return <FavoriteThread />
      default:
        return null
    }
  }

  return (
    <div id="your-profile">
      <div className="profile-title">
        <DisplayAvatar currentUser={user.id} size={40}/>
        <h3 style={{ marginLeft: '10px' }}>{user.username}</h3>
      </div>
      <Layout style={{
        height: '80vh',
        width: '80vw',
        // marginBottom: '10px',
      }}>
        <Sider breakpoint="lg"
               collapsedWidth="0"
               theme="light"
               style={{ border: '1px solid #DDDDDD' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['user']}
            defaultOpenKeys={['user']}
            style={{ height: '100%' }}
            items={items1}
            onSelect={({ key }) => setSelectedKey(key)}
          />
        </Sider>
        <Content
          style={{
            padding: 20,
            marginLeft: 30,
            background: 'white',
            border: '1px solid #DDDDDD',
            overflow: 'auto',
          }}>
          <RenderContent />
        </Content>
      </Layout>
    </div>
  );
};
