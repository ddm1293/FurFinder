import SearchBar from './Search/SearchBar'
import CardView from './CardView'
import ListView from './ListView'
import { Layout, Pagination, Menu, Divider } from 'antd'
import { AppstoreOutlined, BarsOutlined, EnvironmentOutlined } from '@ant-design/icons'
import '../../style/Forum/Forum.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { threads } from '../../mocks/forumMock'
import AdvancedSearchButton from './Search/AdvancedSearchButton'
import AdvancedSearchSiderPanel from './Search/AdvancedSearchSiderbar'

const { Content } = Layout

function Forum ({ threadType }) {
  // separate list of items into different pages
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 6
  const startIndex = (currentPage - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  let displayedCards = []

  const searchResults = useSelector((state) => state.forum.searchResults);
  if (searchResults) {
    displayedCards = searchResults.slice(startIndex, endIndex);
  }

  // render threads in different views
  const [selectedKey, setSelectedKey] = useState('')
  const viewOptions = [{
    key: 'card',
    label: 'Card View',
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

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const clickAdvancedSearch = () => {
    setShowAdvancedSearch(true);
  }
  const handleCloseAdvancedSearch = () => {
    setShowAdvancedSearch(false);
  }

  return (
    <div className='forum-container'>
      <div className="forum-content">
        <div className="forum-menu-bar">
          <Menu
            className='forum-view-menu'
            onClick={(event) => {
            setSelectedKey(event.key)
          }}
            selectedKeys={[selectedKey]}
            mode="horizontal"
            items={viewOptions} />
          <SearchBar threadType={threadType}/>
          <AdvancedSearchButton clickAdvancedSearch={clickAdvancedSearch} />
        </div>

        <Divider className='forum-divider'/>

        <div className='forum-main-content-view'>
          <div className='forum-main-content' style={{paddingRight: '20px'}}>
            {render()}
          </div>

          <div className='advanced-search-container' style={{borderLeft: '1px solid black', paddingLeft:'20px'}}>
            { showAdvancedSearch &&
              <AdvancedSearchSiderPanel onClose={handleCloseAdvancedSearch}/>
            }
          </ div>
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
