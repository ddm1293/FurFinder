import { useDispatch } from 'react-redux'
import { Modal, Input } from 'antd'
import { useEffect, useState } from 'react'
import '../../../style/Forum/SearchBar.css'
import SearchOnTags from './SearchOnTags'
import { searchThreadsAsync } from '../../../thunk/forumThunk'

const { Search } = Input
function SearchBar ({ threadType }) {
  const dispatch = useDispatch()
  const [selectedTags, setTags] = useState([]);
  const [showEmptyKeywordModal, setShowEmptyKeywordModal] = useState(false);
  const [showNoMatchedThreadsModal, setShowNoMatchedThreadsModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleCloseEmptyKeywordModal = () => {
    setShowEmptyKeywordModal(false);
  };


  return (
    <div className='search-container'>
      <SearchOnTags selectedTags={selectedTags} setTags={setTags}/>

      <Search
        className='search-bar-keyword-input'
        placeholder="Search keyword"
        allowClear
        size='small'
        onSearch={(keyword) => {
          if (!keyword) {
            setShowEmptyKeywordModal(true);
            return; // Stop execution if the keyword is empty
          }
          let searchOn = selectedTags.join();
          if (!searchOn) {
            searchOn = 'title,content'
          }
          const params = {
              threadType,
              keyword,
              searchOn
          }
          dispatch(searchThreadsAsync(params))
            .then((results) => {
              console.log("Search Results:", results);
              setSearchResults(results.payload); // Update the search results state
              console.log("Search Results Length:", results.payload.length);
              setShowNoMatchedThreadsModal(results.payload.length === 0);
            })
            .catch((error) => {
              console.error("Error while fetching data:", error);
            });
        }}
      />
      <Modal
        title="Error"
        visible={showEmptyKeywordModal}
        onOk={handleCloseEmptyKeywordModal}
        onCancel={handleCloseEmptyKeywordModal}
      >
        Please input a keyword.
      </Modal>


      <Modal
        title="No Matched Threads"
        visible={showNoMatchedThreadsModal}
        onOk={() => setShowNoMatchedThreadsModal(false)} // Handle closing of "No Matched Threads" modal
        onCancel={() => setShowNoMatchedThreadsModal(false)} // Handle closing of "No Matched Threads" modal
      >
        No matched threads.
      </Modal>

    </div>
  )
}
export default SearchBar
