import FilterThreads from './FilterThreads'
import SearchBar from './SearchBar'
import CardView from './CardView'
import CreateThreadButton from '../CreateThread/CreateThreadButton'
import ListView from './ListView'
import { Breadcrumb, Layout, Pagination, Menu, Divider } from 'antd'
import { AppstoreOutlined, BarsOutlined, EnvironmentOutlined } from '@ant-design/icons'
import '../../style/Forum.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { threads } from '../../mocks/forumMock'

const { Content } = Layout

function Forum (props) {
  // separate list of items into different pages
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 6
  const startIndex = (currentPage - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  let displayedCards = threads.slice(startIndex, endIndex)

  // render filtered threads
  const filteredThreads = useSelector((state) => state.forum.filteredThreads);
  if (filteredThreads.length > 1) {
    displayedCards = filteredThreads.slice(startIndex, endIndex)
  }

  // render threads in different views
  const [selectedKey, setSelectedKey] = useState('')
  const viewOptions = [{
    key: 'grid',
    label: 'Grid View',
    icon: <AppstoreOutlined />
  }, {
    key: 'list',
    label: 'List View',
    icon: <BarsOutlined />
  }, {
    key: 'map',
    label: 'Map View',
    icon: <EnvironmentOutlined />
  }]
  const render = () => {
    switch (selectedKey) {
      case 'list':
        return <ListView items={displayedCards} />
      case 'map':
        return null
      default: // grid
        return <CardView items={displayedCards} />
    }
  }

  return (
    <div className='forum-container'>
      <div className="forum-content">
        <div className="forum-view">
          <Menu
            className='forum-view-menu'
            onClick={(event) => {
            setSelectedKey(event.key)
          }}
            selectedKeys={[selectedKey]}
            mode="horizontal"
            items={viewOptions} />
          <SearchBar />
        </div>

        <Divider className='forum-divider'/>

        <div className='forum-main-content-view'>
          {render()}
        </div>

        <Pagination
          current={currentPage}
          pageSize={cardsPerPage}
          total={threads.length}
          onChange={(page) => {
            setCurrentPage(page)
          }}
        />
      </div>

    </div>
  )
}

export default Forum
