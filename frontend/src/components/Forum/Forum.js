import SearchBar from './Search/SearchBar'
import CardView from './CardView'
import ListView from './ListView'
import { Pagination, Menu, Divider, Button, Form } from 'antd'
import MapView from './MapView'
import { AppstoreOutlined, BarsOutlined, EnvironmentOutlined } from '@ant-design/icons'
import '../../style/Forum/Forum.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import AdvancedSearchButton from './Search/AdvancedSearchButton'
import AdvancedSearchSidePanel from './Search/AdvancedSearchSidebar'
import { clearSearchResults, updateViewStatus } from '../../store/forumSlice'
import { getThreadsAsync } from '../../thunk/forumThunk'
import axios from 'axios'
import { fetchPetFromThread } from '../../thunk/thunkHelper'

function Forum ({ threadType }) {
  const dispatch = useDispatch();

  const cardsPerPage = useSelector((state) => state.forum.pageSizeCard);
  const searchResults = useSelector((state) => state.forum.searchResults);
  const pagesFromSlice = useSelector((state) => state.forum.pages);
  const displayStatus = useSelector((state) => state.forum.displayStatus);

  const selectedView = useSelector((state) => state.forum.viewStatus);
  const [totalThreadNum, setTotalThreadNum] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [searchBarId, setSearchBarId] = useState(Date.now()); // for resetting search bar input; see below
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    dispatch(getThreadsAsync());
  }, [dispatch, threadType]);

  // render threads in different views
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
  }];

  const fetchThreads = async (selectedThreadType) => {
    try {
      const response = await axios.get(`http://localhost:3001/thread/get${selectedThreadType}`);
      const updated = await fetchPetFromThread(response.data.threads)
      setThreads(updated);
      console.log(updated);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Call the fetchThreads function with the initial selected thread type
    fetchThreads(threadType)
      .then(() => setLoading(false))
      .catch(error => {
        console.error('Error while fetching threads:', error);
        setLoading(false);
      });
  }, [threadType]); // Effect will re-run whenever threadType changes


  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  let displayedCards = pagesFromSlice[currentPage] || [];
  if (threads && threads.length > 0) {
    displayedCards = threads.slice(startIndex, endIndex);
  }
  if (searchResults && searchResults.length > 0) {
    displayedCards = searchResults.slice(startIndex, endIndex);
  }
  const [advancedSearchForm] = Form.useForm(); // targets advanced search form

  const render = () => {
    switch (selectedView) {
      case 'list':
        return <ListView items={displayedCards} />
      case 'map':
        return <MapView />
      default: // grid
        return <CardView items={displayedCards} />
    }
  }

  const clickAdvancedSearch = () => {
    setShowAdvancedSearch(true);
  }

  const handleCloseAdvancedSearch = () => {
    advancedSearchForm.resetFields();
    setShowAdvancedSearch(false);
  }

  const resetSearch = () => {
    console.log('reset search');

    setSearchBarId(Date.now()); // this is a hack, but this requires the least effort to reset search bar input
    if (showAdvancedSearch) { advancedSearchForm.resetFields(); }
    dispatch(clearSearchResults());
  }

  useEffect( () => {
    dispatch(clearSearchResults()); // reset search result on refresh and app exit

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
    } else if(threads.length) {
      setTotalThreadNum(threads.length);
      setCurrentPage(1);
    }
    else {
      (async () => {
        const res = await axios.get(`http://localhost:3001/thread/getTotalThreadNumber`)
        setTotalThreadNum(res.data);
        setCurrentPage(1);
      })();
    }
  }, [threads, searchResults]);

  // pause scrolling if advanced search panel is active
  useEffect(() => {
    if (showAdvancedSearch) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [showAdvancedSearch]);

  return (
    <div className='forum-container'>
      <div className="forum-content">
        <div className="forum-menu-bar">
          <Menu
            className='forum-view-menu'
            onClick={(event) => {
              dispatch(updateViewStatus(event.key))
          }}
            selectedKeys={[selectedView]}
            mode="horizontal"
            items={viewOptions} />
          <SearchBar key={searchBarId} threadType={threadType}/>
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
            <div className='forum-main-content'>
              {render()}
            </div>
          }

          {
            showAdvancedSearch &&
            <div className='advanced-search-container'>
              <AdvancedSearchSidePanel
                onClose={handleCloseAdvancedSearch}
                threadType={threadType}
                form={advancedSearchForm}
              />
            </div>
          }
        </div>

        {
          selectedView !== 'map' &&
          <Pagination
            current={currentPage}
            pageSize={cardsPerPage}
            total={totalThreadNum}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        }
      </div>

    </div>
  )
}

export default Forum
