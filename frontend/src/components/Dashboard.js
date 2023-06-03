import React from 'react';
import '../style/Dashboard.css'
import CreateThreadButton from './CreateThread/CreateThreadButton';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content} = Layout;

const items = ['Your missing pets', 'Your witnesses'].map((key, index) => ({
  key: `dashboard-sider-menu-item${index}`,
  label: `${key}`
}));

function Dashboard () {
  return (
    <Layout className='dashboard-layout'>
      <Header >
        {/* add navbar here */}
        Header
      </Header>

      <Layout hasSider>
        <Sider className='dashboard-sider'
               width={200}
               collapsible={true}
               >
          <Menu
            mode='inline'
            defaultSelectedKeys={['dashboard-sider-menu-item0']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items}
          />
        </Sider>

        <Content>
          <CreateThreadButton />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
