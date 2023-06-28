import { useDispatch } from 'react-redux'
import { Button, Input, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import '../../../style/Forum/SearchBar.css'
import SearchOnTags from './SearchOnTags'
import { searchThreadsAsync } from '../../../thunk/searchThunk'

const { Search } = Input
function SearchBar ({ threadType }) {
  const dispatch = useDispatch()
  const [selectedTags, setTags] = useState([]);

  return (
    <div className='search-container'>
      <SearchOnTags selectedTags={selectedTags} setTags={setTags}/>

      <Search
        className='search-bar-keyword-input'
        placeholder="Search keyword"
        allowClear
        size='small'
        onSearch={(keyword) => {
          let searchOn = selectedTags.join();
          if (!searchOn) {
            searchOn = 'title,content'
          }
          const params = {
            threadType,
            keyword,
            searchOn
          }
          dispatch(searchThreadsAsync(params));
        }}
      />
    </div>
  )
}
export default SearchBar
