import SearchBar from './Search/SearchBar'
import CardView from './CardView'
import ListView from './ListView'
import { Pagination, Menu, Divider, Button } from 'antd'
import { AppstoreOutlined, BarsOutlined, EnvironmentOutlined } from '@ant-design/icons'
import '../../style/Forum/Forum.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import AdvancedSearchButton from './Search/AdvancedSearchButton'
import AdvancedSearchSiderPanel from './Search/AdvancedSearchSiderbar'
import { clearSearchResults } from '../../store/forumSlice'
import { getThreadsAsync } from '../../thunk/forumThunk'
import axios from 'axios'

function Forum ({ threadType }) {
  const dispatch = useDispatch();

  const cardsPerPage = useSelector((state) => state.forum.pageSizeCard);
  const searchResults = useSelector((state) => state.forum.searchResults);
  const pagesFromSlice = useSelector((state) => state.forum.pages);
  const displayStatus = useSelector((state) => state.forum.displayStatus);

  const [currentPage, setCurrentPage] = useState(1)
  const [totalThreadNum, setTotalThreadNum] = useState(null);
  const [isLoading, setLoading] = useState(true);
  let displayedCards = pagesFromSlice[currentPage] || [];

  const startIndex = (currentPage - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  if (searchResults && searchResults.length > 0) {
    console.log('is this your fault?')
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

  const resetSearch = () => {
    console.log('reset search');
    dispatch(clearSearchResults());
  }

  // useEffect(() => {
  //   console.log('see isLoading: ', isLoading);
  //   console.log('see pagesFromSlice: ', pagesFromSlice);
  //   console.log('see displayedCard with let', displayedCards);
  // }, [pagesFromSlice])

  useEffect( () => {
    dispatch(clearSearchResults()); // reset search result on refresh

    (async () => {
      const res = await axios.get(`http://localhost:3001/thread/getTotalThreadNumber`)
      setTotalThreadNum(res.data);
    })();
  }, [])

  useEffect(() => {
    console.log('see currentPage:', currentPage);
  }, [currentPage])

  useEffect(() => {
    console.log('get called cardsPerPage: ', currentPage, cardsPerPage);
    dispatch(getThreadsAsync({page: currentPage, limit: cardsPerPage})).then(() => {
      setLoading(false)
    })
  }, [currentPage])

  useEffect(() => {
    if (searchResults.length) {
      setTotalThreadNum(searchResults.length);
      setCurrentPage(1);
    } else {
      (async () => {
        const res = await axios.get(`http://localhost:3001/thread/getTotalThreadNumber`)
        setTotalThreadNum(res.data);
        setCurrentPage(1);
      })();
    }
  }, [searchResults]);

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
          <Button
            className='search-bar-reset-button'
            size='small'
            type='primary'
            onClick={resetSearch}
          >
            Reset
          </Button>
        </div>

        <Divider className='forum-divider'/>

        <div className='forum-main-content-view'>
          {
            isLoading &&
            <div>...Loading</div>
          }

          {
            !isLoading &&
            <div className='forum-main-content' style={{paddingRight: '20px'}}>
              {render()}
            </div>
          }

          <div className='advanced-search-container' style={{borderLeft: '1px solid black', paddingLeft:'20px'}}>
            { showAdvancedSearch &&
              <AdvancedSearchSiderPanel
                onClose={handleCloseAdvancedSearch}
                threadType={threadType}
              />
            }
          </ div>
        </div>

        <Pagination
          current={currentPage}
          pageSize={cardsPerPage}
          total={totalThreadNum}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>

    </div>
  )
}

export default Forum
