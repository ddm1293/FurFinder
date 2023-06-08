import Navbar from '../Navbar/Navbar'
import SearchThread from './SearchThread'
import DisplayThread from './DisplayThread'
import { Breadcrumb, Layout } from 'antd'
import '../../style/ViewThread.css'

const { Content } = Layout

function ViewThread () {
  return (
    <Layout>
      <Navbar />
      <Breadcrumb className="custom-breadcrumb"
        items={[
          { title: 'Home'},
          { title: <a href="">Forum</a> }, // TODO: add link
          { title: 'View Thread'},
        ]}
      />
      <Content className="view-thread-container">
        <div className="side-container">
          <SearchThread />
        </div>
        <div className="view-thread-content">
          <DisplayThread />
        </div>
      </Content>
    </Layout>
  )
}

export default ViewThread
